export interface FileAnalysis {
  path: string;
  size: number;
  lineCount: number;
  complexity: {
    length: number;
    dependencies: number;
    nestingLevel: number;
  };
  type: string;
  potentialIssues: Array<{
    type: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }>;
}

export interface CodeAnalysis {
  developmentMetrics: {
    totalCommits: number;
    uniqueContributors: number;
    releases: number;
    hasDocumentation: boolean;
    stars: number;
    forks: number;
    documentationQuality: {
      hasReadme: boolean;
      hasCodeExamples: boolean;
      hasContributingGuidelines: boolean;
      readmeCompleteness: number;
    };
    totalFiles: number;
    totalSize: number;
    branchInfo: {
      totalBranches: number;
      defaultBranch: string;
      activeBranches: Array<{
        name: string;
        lastCommit: string;
        isStale: boolean;
      }>;
    };
    languageDistribution: Array<{
      language: string;
      percentage: number;
      bytes: number;
    }>;
  };
  communityMetrics: {
    resolvedIssues: number;
    mergedPRs: number;
    issueResolutionRate: number;
    prMergeRate: number;
  };
  codeQualityMetrics: {
    codeToConfigRatio: number;
    implementationToDocRatio: number;
    hasTests: boolean;
    testCoverage: number | null;
    averageFileSize: number;
    largestFiles: Array<{ path: string; size: number }>;
    complexFiles: Array<{ path: string; complexity: number }>;
    potentialDuplicates: Array<{
      files: string[];
      similarity: number;
    }>;
  };
  fileAnalysis: FileAnalysis[];
  suspiciousCharacteristics: Array<{
    type: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }>;
  repositoryScore: number;
} 