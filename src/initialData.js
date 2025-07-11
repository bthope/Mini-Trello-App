export const initialData = {
  activeBoardId: "board-1",
  boards: {
    "board-1": {
      id: "board-1",
      title: "Dự án phát triển hệ thống IT",
      color: "rgba(59, 130, 246, 1)",
      listIds: ["list-1", "list-2", "list-3"],
    },
  },
  lists: {
    "list-1": {
      id: "list-1",
      title: "Cần làm",
      cardIds: ["card-1", "card-5", "card-2", "card-6"],
    },
    "list-2": {
      id: "list-2",
      title: "Đang thực hiện",
      cardIds: ["card-3", "card-4"],
    },
    "list-3": {
      id: "list-3",
      title: "Tạm dừng",
      cardIds: [],
    },
  },
  cards: {
    "card-1": {
      id: "card-1",
      title: "Triển khai hệ thống bảo mật mạng",
      description: "",
      labels: ["security"],
      completed: true,
    },
    "card-2": {
      id: "card-2",
      title: "Phát triển API REST cho ứng dụng mobile",
      description: "",
      labels: ["backend"],
      completed: true,
    },
    "card-3": {
      id: "card-3",
      title: "Thiết kế cơ sở dữ liệu cho hệ thống CRM",
      description: "Tối ưu hóa hiệu suất truy vấn và đảm bảo tính toàn vẹn dữ liệu",
      labels: ["database"],
      completed: false,
    },
    "card-4": {
      id: "card-4",
      title: "Viết tài liệu kỹ thuật hệ thống",
      description: "Tài liệu hướng dẫn sử dụng và bảo trì",
      labels: ["documentation"],
      completed: false,
    },
    "card-5": {
      id: "card-5",
      title: "Tích hợp hệ thống thanh toán online",
      description: "Kết nối với các cổng thanh toán Visa, MasterCard",
      labels: ["integration"],
      completed: true,
    },
    "card-6": {
      id: "card-6",
      title: "Triển khai hệ thống backup tự động",
      description: "",
      labels: ["infrastructure"],
      completed: false,
    },
  },
};