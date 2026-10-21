$content = [System.IO.File]::ReadAllText('C:\Users\sakib\.cline\data\workspaces\chat\Kitchen-Appliances-Hub\src\pages\account.astro', [System.Text.Encoding]::UTF8)

# Use a regex to find and replace the line
$pattern = "showNote\(data\.user \? Welcome! Redirecting\.\.\. : 'Success!', 'success'\);"
$replacement = "showNote(data.user ? `Welcome\${mode === 'register' ? ' to KitchenHub' : ' back'}! Redirecting...` : 'Success!', 'success');"

$content = [System.Text.RegularExpressions.Regex]::Replace($content, $pattern, $replacement)

[System.IO.File]::WriteAllText('C:\Users\sakib\.cline\data\workspaces\chat\Kitchen-Appliances-Hub\src\pages\account.astro', $content, [System.Text.Encoding]::UTF8)
Write-Host "Done"