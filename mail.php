<?php
try {
    $data = (array) json_decode(file_get_contents("php://input"));
    $message = $data['message'];
    $subject = $data['subject'];
    $recipients = $data['recipients'];
    $sender = $data['from'];

    $to = implode(', ', $recipients);
    $headers =  'From: ' . 'no-reply@r-west.com' . "\r\n" .
                'Bcc: ' . $sender . "\r\n" .
                'Reply-To: ' . $sender . "\r\n" .
                'X-Mailer: PHP/' . phpversion();

    mail($to, $subject, $message, $headers);
    echo "{'status': 'success'}";
} catch (Exception $e) {
    echo "{'status': 'failure'}";
}
?>
