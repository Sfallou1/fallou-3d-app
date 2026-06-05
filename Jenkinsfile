pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'sfallou1/fallou-3d-app'
        DOCKER_TAG = "${BUILD_NUMBER}"
    }
    stages {
        stage('Checkout') { 
            steps { 
                echo '📦 Récupération du code...'
                checkout scm 
            } 
        }
        stage('Docker Build') {
            steps {
                echo '🐳 Construction de l\'image Docker...'
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
            }
        }
        stage('Docker Push') {
            steps {
                echo '📤 Push vers Docker Hub...'
                withCredentials([string(credentialsId: 'docker-hub-token', variable: 'DOCKER_PASSWORD')]) {
                    sh '''
                        echo $DOCKER_PASSWORD | docker login -u sfallou1 --password-stdin
                        docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                        docker push ${DOCKER_IMAGE}:latest
                    '''
                }
            }
        }
    }
    post { 
        success { echo '✅ Pipeline réussi !' } 
        failure { echo '❌ Pipeline échoué' }
    }
}
