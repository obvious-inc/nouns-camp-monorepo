import { getAbiItem, decodeFunctionData, parseAbiItem } from "viem";
import useEtherscanContractInfo from "@/hooks/etherscan-contract-info";

const decodeCalldataWithAbi = ({ abi, calldata }) => {
  try {
    const { functionName, args } = decodeFunctionData({
      abi,
      data: calldata,
    });

    if (args == null) return { name: functionName, inputs: [] };

    const { inputs: inputTypes } = getAbiItem({
      abi,
      name: functionName,
    });

    return {
      name: functionName,
      inputs: args,
      inputTypes,
    };
  } catch (e) {
    return null;
  }
};

const useDecodedFunctionData = (
  { target, calldata, signature },
  { enabled = false } = {},
) => {
  const contractInfo = useEtherscanContractInfo(target, { enabled });

  const abi = contractInfo?.abi;
  const proxyImplementation = contractInfo?.proxyImplementation;

  // if signature is malformed, should not try to decode with calldata
  try {
    parseAbiItem(`function ${signature}`);
  } catch (error) {
    return null;
  }

  const decodedFunctionData =
    abi == null ? null : decodeCalldataWithAbi({ abi, calldata });

  if (decodedFunctionData != null) return decodedFunctionData;

  if (proxyImplementation == null) return null;

  const decodedFunctionDataFromProxy = decodeCalldataWithAbi({
    abi: proxyImplementation.abi,
    calldata,
  });

  if (decodedFunctionDataFromProxy == null) return null;

  return {
    proxy: true,
    proxyImplementationAddress: proxyImplementation.address,
    ...decodedFunctionDataFromProxy,
  };
};

export default useDecodedFunctionData;
