<?php 
    $BASEURL = '';
?>
<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=9,IE=edge,chrome=1">
        <title><?= $pageName ?></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="static/css/normalize.min.css">
        <link rel="stylesheet" href="static/css/main.css">

        <?php
        if( isset( $pageCSS ) && !empty( $pageCSS ) ){
            if( is_array( $pageCSS ) ){
                    foreach ( $pageCSS as $key => $css) { ?>
        <link rel="stylesheet" href="<?= $BASEURL ?>static/css/<?= $css ?>"/>    
                    <?php }
                } else { ?>
        <link rel="stylesheet" href="<?= $BASEURL ?>static/css/<?= $pageCSS ?>"/>    
                <?php }
            }
        ?>

        <script src="<?= $BASEURL ?>static/js/vendor/modernizr-2.8.3.min.js"></script>
    </head>
    <body class="<?= $className?>">
