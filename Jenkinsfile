pipeline {
    agent any

    triggers {
        githubPullRequests {
            admin('OWNER')
            admins(['ADMIN1', 'ADMIN2'])
            triggerPhrase('test this please')
            onlyTriggerPhrase(false)
            useGitHubHooks(true)
            permitAll(false)
            autoCloseFailedPullRequests(false)
            displayBuildErrorsOnDownstreamBuilds(false)
        }
    }

    tools {
        nodejs 'Node'  // Doit correspondre au nom configuré dans Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }

    post {
        always {
            // Publier les résultats des tests
            junit '**/junit.xml'

            // Nettoyer l'espace de travail
            cleanWs()
        }

        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}
