$content = [System.IO.File]::ReadAllText('C:\Users\sakib\.cline\data\workspaces\chat\Kitchen-Appliances-Hub\src\pages\account.astro', [System.Text.Encoding]::UTF8)

# Now the file has "Welcome! Redirecting..." without backslash - add template literal
$old = "showNote(data.user ? Welcome! Redirecting... : 'Success!', 'success');"
$new = "showNote(data.user ? `Welcome\${mode === 'register' ? ' to KitchenHub' : ' back'}! Redirecting...` : 'Success!', 'success');"

$content = $content.Replace($old, $new)

[System.IO.File]::WriteAllText('C:\Users\sakib\.cline\data\workspaces\chat\Kitchen-Appliances-Hub\src\pages\account.astro', $content, [System.Text.Encoding]::UTF8)
Write-Host "Done"