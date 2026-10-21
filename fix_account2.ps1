$content = [System.IO.File]::ReadAllText('C:\Users\sakib\.cline\data\workspaces\chat\Kitchen-Appliances-Hub\src\pages\account.astro', [System.Text.Encoding]::UTF8)

# Find and replace the specific line - use a more flexible approach
$old = "showNote(data.user ? Welcome! Redirecting... : 'Success!', 'success');"
$new = "showNote(data.user ? `Welcome\${mode === 'register' ? ' to KitchenHub' : ' back'}! Redirecting...` : 'Success!', 'success');"

if ($content.Contains($old)) {
    $content = $content.Replace($old, $new)
    Write-Host "Replaced welcome message"
} else {
    Write-Host "Old string not found, trying alternative..."
    # Try with different spacing
    $old2 = "showNote(data.user ? Welcome! Redirecting... : 'Success!', 'success');"
    if ($content.Contains($old2)) {
        $content = $content.Replace($old2, $new)
        Write-Host "Replaced with alternative"
    } else {
        Write-Host "Still not found"
        # Show what's actually there
        $idx = $content.IndexOf("Welcome! Redirecting")
        if ($idx -ge 0) {
            Write-Host "Found at: $idx"
            Write-Host "Context: " $content.Substring($idx - 30, 80)
        }
    }
}

[System.IO.File]::WriteAllText('C:\Users\sakib\.cline\data\workspaces\chat\Kitchen-Appliances-Hub\src\pages\account.astro', $content, [System.Text.Encoding]::UTF8)
Write-Host "Done"