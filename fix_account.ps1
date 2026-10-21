$content = [System.IO.File]::ReadAllText('C:\Users\sakib\.cline\data\workspaces\chat\Kitchen-Appliances-Hub\src\pages\account.astro', [System.Text.Encoding]::UTF8)
$old = "showNote(data.user ? Welcome! Redirecting... : 'Success!', 'success');"
$new = "showNote(data.user ? `Welcome${mode === 'register' ? ' to KitchenHub' : ' back'}! Redirecting...` : 'Success!', 'success');`n          // Dispatch event for header to update`n          window.dispatchEvent(new CustomEvent('auth:login', { detail: { user: data.user } }));"
$content = $content.Replace($old, $new)

# Also update logout to dispatch event
$oldLogout = "showNote('You have been signed out.', 'info');`n      } catch {"
$newLogout = "showNote('You have been signed out.', 'info');`n        // Dispatch event for header to update`n        window.dispatchEvent(new CustomEvent('auth:logout'));`n      } catch {"
$content = $content.Replace($oldLogout, $newLogout)

[System.IO.File]::WriteAllText('C:\Users\sakib\.cline\data\workspaces\chat\Kitchen-Appliances-Hub\src\pages\account.astro', $content, [System.Text.Encoding]::UTF8)
Write-Host "Done"