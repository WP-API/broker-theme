<?php get_header(); ?>

<h1>Register as a Developer</h1>

<div class="content">
	<form method="post">
		<p>
			<label>Name</label>
			<input name="user_name" type="text" required />
		</p>
		<p>
			<label>Email Address</label>
			<input name="user_email" type="email" required />
		</p>
		<p>
			<input type="submit" value="Register" />
		</p>
		<input type="hidden" name="ba-action" value="register" />
		<?php wp_nonce_field( 'ba-register' ) ?>
	</form>
</div>

<?php get_footer() ?>
