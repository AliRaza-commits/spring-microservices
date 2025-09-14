# Detect OS
$platform = [System.Environment]::OSVersion.Platform
$isWindows = $platform -eq "Win32NT"
$isLinux = $platform -eq "Unix"

$reactClientApp = "ui/react-client"

# Define services
$services = @("auth-server", "config-server", "discovery", "gateway", "school", "student")

# Start Docker containers
Write-Host " Starting Docker containers..."
docker-compose up -d

# Start Spring Boot services
foreach ($service in $services) {
    Write-Host " Starting $service..."

    if ($isWindows) {
        # Windows: open new PowerShell window and run commands
        & cmd /c "cd $service && mvnd.cmd clean install"
        $command = "cd `"$service`"; mvnd.cmd spring-boot:run"
        Start-Process powershell -ArgumentList "-NoExit", "-Command", $command
    }
    elseif ($isLinux) {
        # Linux: use bash to run commands in background
        bash -c "cd $service && mvn clean install"
        $bashCommand = "cd $service; mvn spring-boot:run"
        Start-Process bash -ArgumentList "-c", $bashCommand
    }
    else {
        Write-Host " Unsupported OS detected."
    }
}


# Building and starting React client
cd $reactClientApp
npm install

Write-Host "Starting React Client..."
Start-Process powershell -ArgumentList "-NoExit","-Command","cd $reactClientApp ;npm start"

Write-Host " All services are launching. Check individual terminals for logs."
