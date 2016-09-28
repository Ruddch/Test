<head>
	<link rel="stylesheet" href="static/style.css">
	<script type="text/javascript" src="static/js/script.js"></script>
</head>
<body>
	<section class="wrapper">
		<div class="score-field">
			<span><?php echo $current_points; ?></span>
		</div>
		<ul class="item-list">
			<?php foreach ($actions as $key => $item) { ?>
				<li class="item item-<?php echo $key; ?>" data-id="<?php echo $item[id]; ?>" data-recovery="<?php echo $item[recovery_time]; ?>" data-point="<?php echo $item[points]; ?>">
					<img src="img/item-<?php echo $key; ?>.png">
					<div class="rest-timer" data-rest="<?php echo $item[rest_time]; ?>">
						<span></span>
					</div>
				</li>
			<?php }; ?>
		</ul> 
	</section>
</body>
