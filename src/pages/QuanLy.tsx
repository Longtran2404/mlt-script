import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConnectionStatus from "../components/ConnectionStatus";
import GoogleConnectButton from "../components/GoogleConnectButton";

interface SheetData {
  id: string;
  name: string;
  sheetUrl: string;
  sheets?: Array<{
    properties: {
      sheetId: number;
      title: string;
      index: number;
    };
  }>;
  data?: any[];
}

export default function QuanLy() {
  const [loading, setLoading] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState<SheetData | null>(null);
  const [sheetTabs, setSheetTabs] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>("");
  const [sheetData, setSheetData] = useState<any[]>([]);
  const [editingCell, setEditingCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [activeTab, setActiveTab] = useState("projects");

  // Load sheet data from Google Sheets API
  const loadSheetData = async () => {
    setLoading(true);
    try {
      console.log("🔄 Loading real Google Sheets data...");
      
      // Import Google Sheets service
      const { googleSheetsService } = await import("../services/googleSheetsSimple");
      
      // Test connection first
      const connectionTest = await googleSheetsService.testConnection();
      if (!connectionTest) {
        console.error("❌ Google Sheets connection failed");
        throw new Error("Không thể kết nối đến Google Sheets. Vui lòng kiểm tra cấu hình.");
      }

      // Get all sheets
      const sheets = await googleSheetsService.getAllSheets();
      console.log("✅ Found sheets:", sheets);

      if (sheets.length === 0) {
        throw new Error("Không tìm thấy sheets nào trong spreadsheet");
      }

      // Create sheet data structure
      const sheetInfo: SheetData = {
        id: process.env.REACT_APP_VLU_SCRIPT_SHEET_ID || "",
        name: "MLT - KỊCH BẢN",
        sheetUrl: `https://docs.google.com/spreadsheets/d/${process.env.REACT_APP_VLU_SCRIPT_SHEET_ID}/edit`,
        sheets: sheets.map(sheet => ({
          properties: {
            sheetId: sheet.id,
            title: sheet.title,
            index: 0
          }
        }))
      };

      setSelectedSheet(sheetInfo);
      setSheetTabs(sheetInfo.sheets || []);
      setSelectedTab(sheetInfo.sheets?.[0]?.properties.title || "");

      // Load data from first sheet
      if (sheets.length > 0) {
        console.log("📊 Loading data from first sheet:", sheets[0].title);
        const firstSheetData = await googleSheetsService.getSheetData(sheets[0].title);
        console.log("✅ Sheet data loaded:", firstSheetData.length, "rows");
        setSheetData(firstSheetData);
      }

    } catch (error) {
      console.error("❌ Error loading sheet data:", error);
      // Fallback to CSV method
      try {
        console.log("🔄 Trying CSV fallback...");
        const { googleSheetsService } = await import("../services/googleSheetsSimple");
        const csvScripts = await googleSheetsService.loadViaCSV();
        
        // Convert scripts to sheet data format for display
        if (csvScripts.length > 0) {
          const csvData = [
            ["STT", "Timestamp", "Nội dung", "Mô tả", "Ghi chú", "Action"],
            ...csvScripts.flatMap(script => 
              script.scenes.map((scene, index) => [
                (index + 1).toString(),
                scene.timestampString,
                scene.content,
                scene.description || "",
                scene.notes || "",
                scene.action || ""
              ])
            )
          ];
          setSheetData(csvData);
          
          // Set mock sheet info
          const fallbackSheet: SheetData = {
            id: process.env.REACT_APP_VLU_SCRIPT_SHEET_ID || "",
            name: "MLT - KỊCH BẢN (CSV)",
            sheetUrl: `https://docs.google.com/spreadsheets/d/${process.env.REACT_APP_VLU_SCRIPT_SHEET_ID}/edit`,
            sheets: [{ properties: { sheetId: 0, title: "CSV Data", index: 0 } }]
          };
          setSelectedSheet(fallbackSheet);
          setSheetTabs(fallbackSheet.sheets || []);
          setSelectedTab("CSV Data");
          
          console.log("✅ CSV fallback successful");
        } else {
          throw new Error("No data available via CSV method");
        }
      } catch (csvError) {
        console.error("❌ CSV fallback also failed:", csvError);
        alert("Không thể tải dữ liệu từ Google Sheets. Vui lòng kiểm tra:\n1. Kết nối internet\n2. Sheet có được chia sẻ công khai\n3. Sheet ID đúng: " + (process.env.REACT_APP_VLU_SCRIPT_SHEET_ID || "chưa cấu hình"));
      }
    } finally {
      setLoading(false);
    }
  };

  // Load data from specific sheet tab
  const loadSheetTabData = async (tabTitle: string) => {
    if (!selectedSheet) return;
    
    try {
      console.log("📊 Loading data from tab:", tabTitle);
      const { googleSheetsService } = await import("../services/googleSheetsSimple");
      const tabData = await googleSheetsService.getSheetData(tabTitle);
      console.log("✅ Tab data loaded:", tabData.length, "rows");
      setSheetData(tabData);
      setSelectedTab(tabTitle);
    } catch (error) {
      console.error("❌ Error loading tab data:", error);
      alert("Không thể tải dữ liệu từ tab: " + tabTitle);
    }
  };

  // Update cell value
  const updateCell = async (row: number, col: number, value: string) => {
    try {
      // Update local data immediately for UI responsiveness
      const newData = [...sheetData];
      newData[row][col] = value;
      setSheetData(newData);
      setEditingCell(null);
      setEditValue("");
      
      // TODO: Implement real Google Sheets update
      console.log("📝 Cell updated locally - future: sync with Google Sheets");
    } catch (error) {
      console.error("❌ Error updating cell:", error);
    }
  };

  // Reload data when Google connection status changes
  const handleGoogleConnect = (connected: boolean) => {
    console.log("🔄 Google connection status changed:", connected);
    if (connected) {
      // Reload sheet data when Google is connected
      setTimeout(() => {
        loadSheetData();
      }, 1000); // Give time for token to be saved
    }
  };

  useEffect(() => {
    loadSheetData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-100/50 dark:from-blue-500/20 dark:to-purple-900/30 border border-blue-500/20 dark:border-blue-700/50 rounded-full"
        >
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            Quản lý kịch bản
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-mlt-ink to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Quản Lý Dự Án
        </motion.h1>
        <motion.p
          className="text-xl text-mlt-ink/70 dark:text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Quản lý tất cả dự án, kịch bản và phân tích hiệu suất một cách chuyên
          nghiệp
        </motion.p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200/50 dark:border-gray-700/50 p-6"
      >
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
          {[
            { id: "projects", label: "Dự Án", icon: "📊" },
            { id: "sheets", label: "Google Sheets", icon: "📝" },
            { id: "users", label: "Người Dùng", icon: "👥" },
            { id: "settings", label: "Cài Đặt", icon: "⚙️" },
            { id: "analytics", label: "Phân Tích", icon: "📈" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-white dark:bg-gray-600 text-mlt-ink dark:text-white shadow-sm"
                  : "text-mlt-ink/70 dark:text-gray-400 hover:text-mlt-ink dark:hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "projects" && (
          <motion.div
            key="projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200/50 dark:border-gray-700/50 p-8"
          >
            <h2 className="text-2xl font-bold text-mlt-ink dark:text-white mb-6">
              Quản Lý Dự Án
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Tuyển sinh 2025",
                  status: "active",
                  progress: 75,
                  members: 5,
                  deadline: "2025-02-15",
                },
                {
                  name: "Đào tạo kỹ năng",
                  status: "completed",
                  progress: 100,
                  members: 3,
                  deadline: "2025-01-30",
                },
                {
                  name: "Nghiên cứu khoa học",
                  status: "planning",
                  progress: 25,
                  members: 8,
                  deadline: "2025-06-30",
                },
              ].map((project, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-mlt-ink dark:text-white">
                      {project.name}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        project.status === "active"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                          : project.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                      }`}
                    >
                      {project.status === "active"
                        ? "Đang thực hiện"
                        : project.status === "completed"
                        ? "Hoàn thành"
                        : "Lập kế hoạch"}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-mlt-ink/70 dark:text-gray-400">
                        Tiến độ:
                      </span>
                      <span className="text-mlt-ink dark:text-white font-medium">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-mlt-red to-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-mlt-ink/70 dark:text-gray-400">
                        Thành viên:
                      </span>
                      <span className="text-mlt-ink dark:text-white font-medium">
                        {project.members}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-mlt-ink/70 dark:text-gray-400">
                        Deadline:
                      </span>
                      <span className="text-mlt-ink dark:text-white font-medium">
                        {project.deadline}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                      Xem chi tiết
                    </button>
                    <button className="flex-1 px-3 py-2 bg-mlt-red text-white text-sm rounded-lg hover:bg-red-700 transition-colors">
                      Chỉnh sửa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "sheets" && (
          <motion.div
            key="sheets"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200/50 dark:border-gray-700/50 p-8"
          >
            <h2 className="text-2xl font-bold text-mlt-ink dark:text-white mb-6">
              Quản Lý Google Sheets
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mlt-red"></div>
              </div>
            ) : selectedSheet ? (
              <div className="space-y-6">
                {/* Sheet Info */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-mlt-ink dark:text-white">
                        {selectedSheet.name}
                      </h3>
                      <p className="text-sm text-mlt-ink/70 dark:text-gray-400">
                        ID: {selectedSheet.id}
                      </p>
                    </div>
                    <a
                      href={selectedSheet.sheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Mở Google Sheets
                    </a>
                  </div>

                  {/* Sheet Tabs */}
                  <div className="flex space-x-2 mb-4">
                    {sheetTabs.map((tab, index) => (
                      <button
                        key={index}
                        onClick={() => loadSheetTabData(tab.properties.title)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedTab === tab.properties.title
                            ? "bg-mlt-red text-white"
                            : "bg-white dark:bg-gray-600 text-mlt-ink dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500"
                        }`}
                      >
                        {tab.properties.title}
                      </button>
                    ))}
                  </div>

                  {/* Sheet Data Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-600">
                          {sheetData[0]?.map(
                            (header: string, index: number) => (
                              <th
                                key={index}
                                className="px-4 py-3 text-left text-sm font-medium text-mlt-ink dark:text-white border border-gray-200 dark:border-gray-500"
                              >
                                {header}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {sheetData.slice(1).map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className="hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            {row.map((cell: string, colIndex: number) => (
                              <td
                                key={colIndex}
                                className="px-4 py-3 text-sm text-mlt-ink dark:text-white border border-gray-200 dark:border-gray-500"
                              >
                                {editingCell?.row === rowIndex &&
                                editingCell?.col === colIndex ? (
                                  <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) =>
                                      setEditValue(e.target.value)
                                    }
                                    onBlur={() =>
                                      updateCell(rowIndex, colIndex, editValue)
                                    }
                                    onKeyPress={(e) => {
                                      if (e.key === "Enter") {
                                        updateCell(
                                          rowIndex,
                                          colIndex,
                                          editValue
                                        );
                                      }
                                    }}
                                    className="w-full px-2 py-1 border border-mlt-red rounded focus:ring-2 focus:ring-mlt-red/30 focus:border-mlt-red"
                                    autoFocus
                                  />
                                ) : (
                                  <div
                                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500 px-2 py-1 rounded"
                                    onClick={() => {
                                      setEditingCell({
                                        row: rowIndex,
                                        col: colIndex,
                                      });
                                      setEditValue(cell);
                                    }}
                                  >
                                    {cell}
                                  </div>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-mlt-ink dark:text-white mb-2">
                  Chưa có dữ liệu
                </h3>
                <p className="text-mlt-ink/70 dark:text-gray-400">
                  Hãy kết nối Google Sheets để xem dữ liệu
                </p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "users" && (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200/50 dark:border-gray-700/50 p-8"
          >
            <h2 className="text-2xl font-bold text-mlt-ink dark:text-white mb-6">
              Quản Lý Người Dùng
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Nguyễn Văn A",
                  role: "Admin",
                  email: "nguyenvana@mlt.edu.vn",
                  status: "active",
                },
                {
                  name: "Trần Thị B",
                  role: "Editor",
                  email: "tranthib@mlt.edu.vn",
                  status: "active",
                },
                {
                  name: "Lê Văn C",
                  role: "Viewer",
                  email: "levanc@mlt.edu.vn",
                  status: "inactive",
                },
              ].map((user, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-mlt-red/20 rounded-full flex items-center justify-center">
                      <span className="text-xl font-semibold text-mlt-red">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-mlt-ink dark:text-white">
                        {user.name}
                      </h3>
                      <p className="text-sm text-mlt-ink/70 dark:text-gray-400">
                        {user.role}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-mlt-ink/70 dark:text-gray-400">
                      {user.email}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
                      }`}
                    >
                      {user.status === "active"
                        ? "Hoạt động"
                        : "Không hoạt động"}
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                      Chỉnh sửa
                    </button>
                    <button className="flex-1 px-3 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors">
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "settings" && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200/50 dark:border-gray-700/50 p-8"
          >
            <h2 className="text-2xl font-bold text-mlt-ink dark:text-white mb-6">
              Cài Đặt Hệ Thống
            </h2>

            <div className="space-y-6">
              {/* Google Connection */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-mlt-ink dark:text-white mb-4">
                  Kết nối Google Account
                </h3>
                <div className="space-y-4">
                  <p className="text-sm text-mlt-ink/70 dark:text-gray-400">
                    Kết nối với Google để truy cập Google Sheets và tải dữ liệu kịch bản.
                  </p>
                  <GoogleConnectButton 
                    onConnect={handleGoogleConnect}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Connection Status */}
              <div className="mb-6">
                <ConnectionStatus
                  showDetails={true}
                  autoRefresh={true}
                  refreshInterval={30000}
                  className="w-full"
                />
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-mlt-ink dark:text-white mb-4">
                  Cài đặt Google Sheets
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-mlt-ink dark:text-white mb-2">
                      Google Sheets ID
                    </label>
                    <input
                      type="text"
                      defaultValue="1Q43gGNkseRl5dZDnenhNVvJCf7cappiKykCraqL-B-A"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-mlt-red/30 focus:border-mlt-red dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-mlt-ink dark:text-white mb-2">
                      API Key
                    </label>
                    <input
                      type="password"
                      defaultValue="••••••••••••••••"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-mlt-red/30 focus:border-mlt-red dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <button className="px-6 py-3 bg-mlt-red text-white font-semibold rounded-xl hover:bg-red-700 transition-colors">
                    Lưu cài đặt
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-mlt-ink dark:text-white mb-4">
                  Cài đặt thông báo
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 text-mlt-red focus:ring-mlt-red/30"
                    />
                    <span className="ml-2 text-sm text-mlt-ink dark:text-white">
                      Thông báo khi có kịch bản mới
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-300 text-mlt-red focus:ring-mlt-red/30"
                    />
                    <span className="ml-2 text-sm text-mlt-ink dark:text-white">
                      Thông báo khi video hoàn thành
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-mlt-red focus:ring-mlt-red/30"
                    />
                    <span className="ml-2 text-sm text-mlt-ink dark:text-white">
                      Thông báo email hàng tuần
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "analytics" && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft border border-gray-200/50 dark:border-gray-700/50 p-8"
          >
            <h2 className="text-2xl font-bold text-mlt-ink dark:text-white mb-6">
              Phân Tích Hiệu Suất
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  label: "Tổng dự án",
                  value: "24",
                  change: "+12%",
                  color: "from-blue-500 to-blue-600",
                },
                {
                  label: "Kịch bản hoàn thành",
                  value: "156",
                  change: "+8%",
                  color: "from-green-500 to-green-600",
                },
                {
                  label: "Video tạo thành công",
                  value: "89",
                  change: "+15%",
                  color: "from-purple-500 to-purple-600",
                },
                {
                  label: "Tỷ lệ hoàn thành",
                  value: "78%",
                  change: "+5%",
                  color: "from-mlt-red to-red-500",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                    >
                      <span className="text-white text-lg font-semibold">
                        📊
                      </span>
                    </div>
                    <span className="text-sm text-green-600 font-medium">
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-mlt-ink dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-mlt-ink/70 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-mlt-ink dark:text-white mb-4">
                Hoạt động gần đây
              </h3>
              <div className="space-y-4">
                {[
                  {
                    action: "Tạo kịch bản mới",
                    time: "2 giờ trước",
                    user: "Nguyễn Văn A",
                  },
                  {
                    action: "Cập nhật video",
                    time: "4 giờ trước",
                    user: "Trần Thị B",
                  },
                  {
                    action: "Xuất bản template",
                    time: "1 ngày trước",
                    user: "Lê Văn C",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white dark:bg-gray-600 rounded-lg"
                  >
                    <div className="w-3 h-3 bg-mlt-red rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-mlt-ink dark:text-white">
                        {activity.action}
                      </div>
                      <div className="text-xs text-mlt-ink/60 dark:text-gray-400">
                        {activity.time} • {activity.user}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
