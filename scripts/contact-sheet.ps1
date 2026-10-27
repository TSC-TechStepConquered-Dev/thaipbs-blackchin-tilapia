Add-Type -AssemblyName System.Drawing
$files = @(Get-ChildItem media -File | Where-Object { $_.Extension -in '.jpg','.png' })
$canvas = New-Object System.Drawing.Bitmap 1200,([int][Math]::Ceiling($files.Count/5)*175)
$g=[System.Drawing.Graphics]::FromImage($canvas)
$g.Clear([System.Drawing.Color]::White)
$font=New-Object System.Drawing.Font 'Arial',9
for($i=0;$i -lt $files.Count;$i++) { $im=[System.Drawing.Image]::FromFile($files[$i].FullName); $x=($i%5)*240; $y=[Math]::Floor($i/5)*175; $scale=[Math]::Min(230/$im.Width,140/$im.Height); $g.DrawImage($im,[int]$x,[int]$y,[int]($im.Width*$scale),[int]($im.Height*$scale)); $g.DrawString("$i $($files[$i].Name)",$font,[System.Drawing.Brushes]::Black,$x,$y+142); $im.Dispose() }
$canvas.Save((Join-Path $PWD 'contact-sheet.jpg')); $g.Dispose();$canvas.Dispose()
$files.Name | ConvertTo-Json | Set-Content scripts/image-files.json -Encoding UTF8
