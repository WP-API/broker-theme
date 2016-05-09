<?php get_header(); ?>

<h1><a href="<?php echo home_url( '/apps/' ) ?>">Apps</a> &rarr; Add New Application</h1>

<div class="content">

	<form method="post">
		<p>
			<label>Application Name</label>
			<input name="application_name" required type="text" value="<?php echo isset( $_POST['application_name' ] ) ? esc_attr( $_POST['application_name' ] ) : '' ?>" />
			<span class="description">This is shown to users during authorization and in their profile.</span>
		</p>
		<p>
			<label>Description</label>
			<textarea name="application_description" required rows="8"><?php echo isset( $_POST['application_description' ] ) ? esc_textarea( $_POST['application_description' ] ) : '' ?></textarea>
		</p>
		<p>
			<label>Callback URL</label>
			<input name="application_callback_url" required type="text" value="<?php echo isset( $_POST['application_callback_url' ] ) ? esc_attr( $_POST['application_callback_url' ] ) : '' ?>" />
			<span class="description">Your application's callback URL. The callback passed with the request token must match the scheme, host, port, and path of this URL.</span>
		</p>
		<p>
			<input type="submit" value="Create Application" />
		</p>

		<input type="hidden" name="ba-action" value="add-application" />
		<?php wp_nonce_field( 'ba-add-application' ) ?>
	</form>
</div>

<?php get_footer() ?>
