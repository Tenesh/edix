const k8s = require('@kubernetes/client-node');

export class createCompilerJob {

    protected kubeConfig: any;

    constructor() {
        this.kubeConfig = new k8s.KubeConfig();
    }

    create() {
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
                    parallelism: 1,
                    completions: 1,
                    template: {
                        metadata: {
                            name: 'compiler-job'
                        },
                        spec: {
                            containers: {
                                name: 'compiler-job',
                                image: 'perl',
                                command: ["perl", "-Mbignum=bpi", "-wle", "print bpi(2000)"]
                            },
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