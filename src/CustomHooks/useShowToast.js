import { useToast } from "@chakra-ui/react";

const useShowToast = () => {
  const toast = useToast();

  const showToast = (description, status, duration = 3000) => {
    toast({
      description: description,
      status: status,
      duration: duration,
      isClosable: true,
      position: "bottom-right",
    });
  };
  return [showToast];
};

export default useShowToast;
