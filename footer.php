<footer>
    <div class="left">
        <a href="">SITE PUBLIC</a><hr><a href="">SITE PRESSE</a>
    </div>

     <div class="right">
        <a href="">Conditions générales de vente</a>
    </div>
</footer>
        
        <!-- SCRIPTS JS -->
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="static/js/vendor/jquery-1.11.2.min.js"><\/script>')</script>
        <script type="text/javascript" src="<?= $BASEURL ?>static/js/vendor/tinymce/tinymce.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCQFIsX54fMBok823NMZvaGf9IowOU2u2g"></script>
        <script src="static/js/main.js"></script>
        <script src="static/js/script.js"></script>
        <?php            
            if( isset( $pageJS ) && !empty( $pageJS ) ){
                if( is_array( $pageJS ) ){
                    foreach ( $pageJS as $key => $js) { ?>
        <script type="text/javascript" src="<?= $BASEURL ?>static/js/<?= $js ?>"></script>
                    <?php }
                } else { ?>
        <script type="text/javascript" src="<?= $BASEURL ?>static/js/<?= $pageJS ?>"></script>
                <?php }
            }
        ?>
    </body>
</html>
