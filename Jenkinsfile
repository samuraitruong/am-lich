pipeline {
  agent any
  stages {
    stage('install') {
      steps {
        nodejs(nodeJSInstallationName: 'latest', configId: '') {
          sh 'node -v'
        }
      }
    }
  }
  environment {
    DEMO = 'DEMO1'
  }
}
