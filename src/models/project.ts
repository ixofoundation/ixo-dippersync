export interface IProject {
  data: IData;
  projectDid: string;
  pubKey: string;
  senderDid: string;
  txHash: string;
  status: string;
}

interface IData {
  title: string;
  projectDid: string;
  ownerName: string;
  ownerEmail: string;
  shortDescription: string;
  longDescription: string;
  impactAction: string;
  createdOn: Date;
  createdBy: string;
  projectLocation: string;
  requiredClaims: string,
  sdgs: string[];
  templates: ITemplates;
  claimStats: IClaimStats;
  claims: IClaim[];
  agentsStats: IAgentStats;
  agents: IAgent[];
  ixo: IIxo;
  serviceEndpoint: string;
  imageLink: string;
  founder: IFounder;
  nodeDid: string
}

interface IIxo {
  totalStaked: number;
  totalUsed: number;
}

interface IFounder {
  name: string;
  email: string;
  countryOfOrigin: string;
  shortDescription: string;
  websiteURL: string;
  logoLink: string;
}

interface IClaimStats {
  currentSuccessful: number;
  currentRejected: number;
}

export interface IClaim {
  date: Date;
  location: ILocation;
  claimId: string;
  claimTemplateId: string;
  status: string;
  saDid: string;
  eaDid?: string;
}

interface ILocation {
  long: string,
  lat: string
}

interface ITemplates {
  claim: IClaimTemplate;
}

interface IClaimTemplate {
  schema: string,
  form: string
}

interface IAgentStats {
  evaluators: number;
  evaluatorsPending: number;
  serviceProviders: number;
  serviceProvidersPending: number;
  investors: number;
  investorsPending: number;
}

export interface IAgent {
  did: string;
  status: string;
  kyc?: boolean;
  role: string;
}
