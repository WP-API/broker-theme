

			<div className="oauth-credentials">
				<h2>OAuth Credentials</h2>
				<table>
					<tbody>
						<tr>
							<td>
								Client Key
							</td>
							<td>
								<code>{ app.slug }</code>
							</td>
						</tr>
						<tr>
							<td>
								Client Secret
							</td>
							<td>
								<code>[secret]</code><br />
								<button className="button">Regenerate Secret</button><br />
								<span className="description">Warning: Regenerating the secret will invalidate all connections.</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>