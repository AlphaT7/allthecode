<?php


$template = file_get_contents('index.html');
/*
$books = array_filter(scandir('books'), function($item) {
    return !is_dir('books/' . $item);
});

foreach ($books as &$v) {
    $v = '<div>' . $v . '</div>';
}
unset($v);
*/
$lessons = (json_decode(file_get_contents('js/lessons.json'), true));
$labs = (json_decode(file_get_contents('js/labs.json'), true));

foreach ($lessons as $lesson => $v) {
    $lessons_array[] = '<div class="lesson"><img src="img/hardlight.png" width="50"><div>' . $v['description'] . '</div></div>';
}

foreach ($labs as $lab => $v) {
    $labs_array[] = '<a href="#">' . $v['description'] . '</a>';
}

//$template = str_replace("%books%", str_replace(",","",implode(",", $books)), $template);
$template = str_replace("%lessons%", implode($lessons_array), $template);
$template = str_replace("%labs%", implode($labs_array), $template);

echo $template;
?>