const k8s = require('@kubernetes/client-node');

export class createCompilerJob {

    protected kubeConfig: any;

    constructor() {
        this.kubeConfig = new k8s.KubeConfig();
    }

    create(input:string) {
        this.kubeConfig.loadFromCluster();
        const batchV1Api = this.kubeConfig.makeApiClient(k8s.BatchV1Api);
        try {
            batchV1Api.createNamespacedJob('default', {
                apiVersion: 'batch/v1',
                kind: 'Job',
                metadata: {
                    name: 'compiler-job'
                },
                spec: {
                    ttlSecondsAfterFinished: 20,
                    template: {
                        metadata: {
                            name: 'compiler-job'
                        },
                        spec: {
                            containers: [{
                                image: 'docker',
                                name: 'docker',
                                command: ["echo", input]
                            }],
                            restartPolicy: "OnFailure"
                        }
                    }
                }
            }).catch((e: any) => console.log(e));
        } catch (error) {
            console.log(error);
        }
    }
}