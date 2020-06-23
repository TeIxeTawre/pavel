<?
if((isset($_POST['your_name'])&&$_POST['your_name']!="")&&(isset($_POST['your_email'])&&$_POST['your_email']!="")){ //Проверка отправилось ли наше поля name и не пустые ли они
        $to = 'teixetawrex@gmail.com'; //Почта получателя, через запятую можно указать сколько угодно адресов
        $subject = 'Обратный звонок'; //Загаловок сообщения
        $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Name: '.$_POST['your_name'].'</p>
                        <p>Email: '.$_POST['your_email'].'</p>                      
                        <p>Phone number: '.$_POST['your_number'].'</p>                      
                        <p>Message: '.$_POST['your_message'].'</p>                        
                    </body>
                </html>'; //Текст нащего сообщения можно использовать HTML теги
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
        $headers .= "From: Отправитель <from@example.com>\r\n"; //Наименование и почта отправителя
        mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail
}
?>