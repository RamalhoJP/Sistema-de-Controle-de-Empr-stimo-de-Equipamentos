export function formatDate(timestamp) {
    
    if (timestamp.toString().length <= 10) {
      timestamp = timestamp * 1000;
    }
  
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
}