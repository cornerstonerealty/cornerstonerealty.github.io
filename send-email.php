<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Load environment variables
function loadEnv($path) {
    if (!file_exists($path)) {
        return false;
    }
    
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        
        if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
            putenv(sprintf('%s=%s', $name, $value));
            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
        }
    }
    return true;
}

// Load .env file
loadEnv(__DIR__ . '/.env');

// Get environment variables
$toEmail = getenv('TO_EMAIL') ?: $_ENV['TO_EMAIL'] ?? '';
$fromEmail = getenv('FROM_EMAIL') ?: $_ENV['FROM_EMAIL'] ?? '';
$fromName = getenv('FROM_NAME') ?: $_ENV['FROM_NAME'] ?? 'Rental Application Form';
$smtpHost = getenv('SMTP_HOST') ?: $_ENV['SMTP_HOST'] ?? '';
$smtpPort = getenv('SMTP_PORT') ?: $_ENV['SMTP_PORT'] ?? '587';
$smtpUsername = getenv('SMTP_USERNAME') ?: $_ENV['SMTP_USERNAME'] ?? '';
$smtpPassword = getenv('SMTP_PASSWORD') ?: $_ENV['SMTP_PASSWORD'] ?? '';
$smtpEncryption = getenv('SMTP_ENCRYPTION') ?: $_ENV['SMTP_ENCRYPTION'] ?? 'tls';

// Validate required email
if (empty($toEmail)) {
    echo json_encode([
        'success' => false,
        'message' => 'Email configuration error: TO_EMAIL is not set in .env file'
    ]);
    exit;
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data || !isset($data['emailBody'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid form data'
    ]);
    exit;
}

$emailBody = $data['emailBody'];
$formData = $data['formData'] ?? [];

// Get applicant email for reply-to
$applicantEmail = $formData['email'] ?? '';

// Prepare email
$subject = 'New Rental Application Submission';
$message = "A new rental application has been submitted.\n\n";
$message .= "========================================\n";
$message .= "RENTAL APPLICATION DETAILS\n";
$message .= "========================================\n\n";
$message .= $emailBody;
$message .= "\n\n========================================\n";
$message .= "Submitted on: " . date('Y-m-d H:i:s') . "\n";
$message .= "========================================\n";

// Headers
$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-Type: text/plain; charset=UTF-8";
$headers[] = "From: " . ($fromName ? "$fromName <$fromEmail>" : $fromEmail);

if ($applicantEmail) {
    $headers[] = "Reply-To: $applicantEmail";
}

$headers[] = "X-Mailer: PHP/" . phpversion();

// Try to send email using SMTP if configured, otherwise use mail()
$mailSent = false;

if (!empty($smtpHost) && !empty($smtpUsername) && !empty($smtpPassword)) {
    // Use PHPMailer if available, otherwise use basic SMTP
    if (file_exists(__DIR__ . '/vendor/autoload.php')) {
        require_once __DIR__ . '/vendor/autoload.php';
        
        if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
            $mail = new PHPMailer\PHPMailer\PHPMailer(true);
            
            try {
                // Server settings
                $mail->isSMTP();
                $mail->Host = $smtpHost;
                $mail->SMTPAuth = true;
                $mail->Username = $smtpUsername;
                $mail->Password = $smtpPassword;
                $mail->SMTPSecure = $smtpEncryption;
                $mail->Port = $smtpPort;
                $mail->CharSet = 'UTF-8';
                
                // Recipients
                $mail->setFrom($fromEmail, $fromName);
                $mail->addAddress($toEmail);
                
                if ($applicantEmail) {
                    $mail->addReplyTo($applicantEmail);
                }
                
                // Content
                $mail->isHTML(false);
                $mail->Subject = $subject;
                $mail->Body = $message;
                
                $mail->send();
                $mailSent = true;
            } catch (PHPMailer\PHPMailer\Exception $e) {
                error_log("PHPMailer Error: " . $mail->ErrorInfo);
                // Fall back to mail() function
            }
        }
    }
}

// Fallback to mail() function
if (!$mailSent) {
    $mailSent = mail($toEmail, $subject, $message, implode("\r\n", $headers));
}

if ($mailSent) {
    echo json_encode([
        'success' => true,
        'message' => 'Application submitted successfully'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send email. Please check your email configuration.'
    ]);
}
?>

