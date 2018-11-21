pipeline {
  agent any
  stages {
    stage('install') {
      steps {
        sh 'npm install'
      }
    }
  }
  environment {
    DEMO = 'DEMO1'
  }
}