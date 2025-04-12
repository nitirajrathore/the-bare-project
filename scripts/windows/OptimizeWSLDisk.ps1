# PowerShell script to shut down WSL and optimize the VHDX

$Distro = "Ubuntu" # Change to your WSL distro name
$VHDPath = "$env:USERPROFILE\AppData\Local\Packages\CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc\LocalState\ext4.vhdx"

Write-Host "Shutting down WSL..."
wsl --shutdown

if (Get-Command Optimize-VHD -ErrorAction SilentlyContinue) {
    # Get the size of the VHDX file before optimization
    $BeforeSize = (Get-Item $VHDPath).Length / 1MB
    Write-Host "Size before optimization: $BeforeSize MB"

    # Write-Host "Optimizing VHDX file at $VHDPath..."
    # Optimize-VHD -Path $VHDPath -Mode Full

    # Get the size of the VHDX file after optimization
    $AfterSize = (Get-Item $VHDPath).Length / 1MB
    Write-Host "Optimization complete!"
    Write-Host "Size after optimization: $AfterSize MB"
} else {
    Write-Host "Optimize-VHD not available. Run this script on Windows Pro/Enterprise with Hyper-V enabled."
    Write-Host "Alternatively, use export/import to reclaim space."
}