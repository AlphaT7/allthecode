<?php defined( '_JEXEC' ) or die( 'Restricted access' );?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" 
   xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" >

<head>
<jdoc:include type="head" />
<!--<link rel="stylesheet" href="<?php echo $this->baseurl ?>/media/jui/css/bootstrap.min.css" type="text/css" />-->
<!--<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/system/css/system.css" type="text/css" />-->
<!--<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/system/css/general.css" type="text/css" />-->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/css/template.css" type="text/css" />
<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/<?php echo $this->template; ?>/css/user.css" type="text/css" />
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
</head>

<body class="site <?php echo $option
	. ' view-' . $view
    . ($layout ? ' layout-' . $layout : ' no-layout');
    ?>">

<nav class="navbar navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <jdoc:include type="modules" name="jmenu"/>
</nav>  

<div class="container-fluid">
      
<jdoc:include type="modules" name="jbanner"/>

<jdoc:include type="modules" name="jcarousel"/>

<jdoc:include type="modules" name="jtop"/>
<img src="<?php echo $this->baseurl; ?>/templates/<?php echo $this->template; ?>/images/myimage.png" alt="Custom image" class="customImage" />
<jdoc:include type="modules" name="jleft"/>
<jdoc:include type="modules" name="jcenter"/>
<jdoc:include type="modules" name="jright"/>
<jdoc:include type="modules" name="jfooter" />
</div>
<script>

    $('.carousel-indicators li').click(function (){
        jQuery('.carousel').carousel(jQuery('li').index(jQuery(this)) - 1);
    });

</script>

</body>

</html>