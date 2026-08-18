pipeline {
    agent any

    parameters {
        gitParameter type: 'PT_BRANCH',
                     name: 'BRANCH_NAME',
                     defaultValue: 'main',
                     branchFilter: 'origin/(.*)',
                     description: 'Select the branch to build and run',
                     selectedValue: 'DEFAULT',
                     sortMode: 'ASCENDING_SMART'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo "Installing Node modules..."
                bat 'npm install'
            }
        }

        stage('Run Application Forever') {
            steps {
                script {
                    echo "Starting Vite dev server on port 5173 (Background Mode)..."
                    
                    // 1. Kill any existing process on port 5173 from a previous build
                    bat '''
                for /f "tokens=5" %%a in ('netstat -aon ^| find ":5173" ^| find "LISTENING"') do (
        taskkill /F /PID %%a
    )
    exit /b 0
                )
            '''
                    
                    // 2. Start Vite in background with JENKINS_NODE_COOKIE override
                    // Setting JENKINS_NODE_COOKIE=dontKillMe tells Jenkins NOT to kill this process
                    // 'start /B' runs it detached in the background
                    bat '''
                        cmd /c "set JENKINS_NODE_COOKIE=dontKillMe && start /B npm run dev -- --host 0.0.0.0 --port 5173"
                    '''
                    
                    sleep 5
                    echo "Build finished. App is running at http://localhost:5173"
                }
            }
        }
    }
    
    // No 'post' cleanup needed here because we WANT the app to stay alive.
    // The next build's "Kill existing process" step will handle cleanup.
}   