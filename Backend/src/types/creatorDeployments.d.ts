export interface DeploymentResponse {
  data: any[];
}

export function getCreatorDeployments(creator: string): Promise<any[]>; 