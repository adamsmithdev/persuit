export const getStatusColor = (status: string) => {
  switch (status) {
    case 'WISHLIST':
      return 'bg-gray-500';
    case 'APPLIED':
      return 'bg-blue-500';
    case 'INTERVIEW':
      return 'bg-yellow-500';
    case 'OFFER':
      return 'bg-green-500';
    case 'REJECTED':
      return 'bg-red-500';
    case 'ACCEPTED':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
};

export const formatStatus = (status: string) => {
  return status.charAt(0) + status.slice(1).toLowerCase();
};
