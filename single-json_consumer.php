<?php get_header(); the_post(); global $post; ?>

<h1><a href="<?php echo site_url( '/apps/' ) ?>">Apps</a> &rarr; <?php the_title() ?></h1>

<div class="content">

	<form method="post">
		<p>
			<label>Application Name</label>
			<input name="application_name" type="text" value="<?php echo esc_attr( $post->post_title ) ?>" />
			<span class="description">This is shown to users during authorization and in their profile.</span>
		</p>
		<p>
			<label>Description</label>
			<textarea name="application_description" rows="8"><?php echo esc_textarea( $post->post_content ) ?></textarea>
		</p>
		<p>
			<label>Callback URL</label>
			<input name="application_callback_url" type="text" value="<?php echo esc_attr( get_post_meta( get_the_id(), 'callback', true ) ) ?>" />
			<span class="description">Your application's callback URL. The callback passed with the request token must match the scheme, host, port, and path of this URL.</span>
		</p>
		<p>
			<input type="submit" value="Save Application" />
			<input type="submit" value="Delete Application" />
		</p>

		<input type="hidden" name="ba-action" value="edit-application" />
		<input type="hidden" name="application_id" value="<?php echo $post->ID ?>" />


		<?php wp_nonce_field( 'ba-edit-application' ) ?>
	</form>
</div>

<div class="oauth-credentials">
	<h2>OAuth Credentials</h2>
	<table>
		<tr>
			<td>
				Client Key
			</td>
			<td>
				<code><?php echo esc_html( get_post_meta( get_the_id(), 'key', true ) ) ?></code>
			</td>
		</tr>
		<tr>
			<td>
				Client Secret
			</td>
			<td>
				<code><?php echo esc_html( get_post_meta( get_the_id(), 'secret', true ) ) ?></code><br />
				<a class="button" href="<?php echo wp_nonce_url( add_query_arg( array( 'ba-action' => 'regenerate-app-secret', 'consumer' => get_the_id() ) ), 'regenerate-secret' ) ?>">Regenerate Secret</a><br />
				<span class="description">Warning: Regenerating the secret will invalidate all connections.</span>
			</td>
		</tr>
	</table>
</div>

<?php get_footer() ?>
