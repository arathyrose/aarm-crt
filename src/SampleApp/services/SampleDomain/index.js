import APICaller, { GET } from "../apiCaller";
import SampleDomainURLs from "./urls";

function getSampleDomain() {
  return APICaller(GET, SampleDomainURLs.sampleDomain);
}

const SampleDomainService = {
    getSampleDomain,
};

export default SampleDomainService;
