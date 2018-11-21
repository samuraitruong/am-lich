pipeline {
  agent any
  stages {
    stage('install') {
      steps {
        nodejs(nodeJSInstallationName: 'latest', configId: '') {
          sh 'npm config ls'
          sh 'npm install'
          sh 'node -v'
        }
      }
    }
  }
  environment {
    DEMO = 'DEMO1'
  }
}
