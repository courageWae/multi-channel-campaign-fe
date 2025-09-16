import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "components/SideNavbar";
import TopNavbar from "components/TopNavbar";
import { FaUpload } from "react-icons/fa";
import * as XLSX from "xlsx";
import Images from "Images";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import Loading from "components/Loading";
import {
  Container,
  Page,
  Content,
  ContentHeader,
  HeaderTitle,
  HeaderSubTitle,
  LearnMoreLink,
} from "../../components/Styles/PageStyles";
import { FiDownload } from "react-icons/fi";
import { SubmitBtn } from "../../components/Styles/InputStyles";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import Config from "Config";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const ImportContactUploadPage = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState([]);
  const [showMapping, setShowMapping] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Check file extension instead of MIME type for better compatibility
      const fileName = selectedFile.name.toLowerCase();
      const isValidCSV = fileName.endsWith('.csv') || 
                        selectedFile.type === "text/csv" || 
                        selectedFile.type === "application/csv" ||
                        selectedFile.type === "application/vnd.ms-excel";
      
      if (!isValidCSV) {
        toast.error("Please upload a CSV file.");
        return;
      }
      setFile(selectedFile);
      readFile(selectedFile);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      // Check file extension instead of MIME type for better compatibility
      const fileName = droppedFile.name.toLowerCase();
      const isValidCSV = fileName.endsWith('.csv') || 
                        droppedFile.type === "text/csv" || 
                        droppedFile.type === "application/csv" ||
                        droppedFile.type === "application/vnd.ms-excel";
      
      if (!isValidCSV) {
        toast.error("Please upload a CSV file.");
        return;
      }
      setFile(droppedFile);
      readFile(droppedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const readFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n');
      const data = lines.map(line => {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        result.push(current.trim());
        return result;
      }).filter(row => row.some(cell => cell.trim() !== ''));
      
      setFileData(data);
    };
    reader.readAsText(file);
  };


  const clearFile = () => {
    setFile(null);
    setFileData([]);

    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.value = null;
    }
  };

  const uploadFileFunction = async (values) => {
    const body = new FormData();

    body.append("file", file);
    body.append("groupId", id);
    
    return await axios.post(`${Config.apiUrl}/addBulkContact`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });
  };

  const uploadFileSuccess = (data) => {
    navigate("/contacts");
    toast.success(data?.data?.msg || "Contacts imported successfully!");
  };

  const uploadFileError = (error) => {
    const errorMessage = error?.response?.data?.msg || 
                        error?.response?.data?.message || 
                        error?.message || 
                        "An error occurred while uploading the file";
    
    toast.error(errorMessage);
  };

  const { isLoading: uploadFileLoading, mutate: uploadFileEntry } = useMutation(
    uploadFileFunction,
    {
      onSuccess: uploadFileSuccess,
      onError: uploadFileError,
    }
  );

  const handleSubmit = (values) => {
    // Validation checks
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }
    
    if (!fileData || fileData.length < 2) {
      toast.error("File appears to be empty or invalid. Please check your CSV file.");
      return;
    }
    
    if (!id) {
      toast.error("Group ID is missing. Please try again.");
      return;
    }
    
    if (!user?.token) {
      toast.error("Authentication token is missing. Please log in again.");
      return;
    }

    uploadFileEntry({
      file: file,
      groupId: id,
    });
  };

  return (
    <>
      <Container>
        {/* <Sidebar /> */}
        <Page>
          <TopNavbar />
          <Content className="!gap-0">
            <ContentHeader>
              <div className="flex justify-between items-center">
                <HeaderTitle>Import contacts from a file</HeaderTitle>
              </div>
              <HeaderSubTitle>
                Upload a file containing all your contacts and their
                information. This is particularly useful when you have a large
                number of contacts to import.
              </HeaderSubTitle>
              <LearnMoreLink>
                <Link to="" className="flex gap-1 items-center">
                  <p className="underline hover:text-topBar-purple">
                    Learn more on how to import your contacts to Sevo
                  </p>
                  <img src={Images.ShareIcon} alt="Share" />
                </Link>
              </LearnMoreLink>
            </ContentHeader>
            <Seperator />
            {uploadFileLoading && <Loading />}
            {!uploadFileLoading && (
              <>
                <UploadTitle>Upload your file</UploadTitle>
                <div className="flex justify-between">
                  <UploadSubTitle>
                    Select a file containing your contacts to import.
                  </UploadSubTitle>
                  <SampleDownloadButton href={Images.SampleCSV} download>
                    <FiDownload className="mt-1 mr-2" /> Download Sample File
                    (.csv)
                  </SampleDownloadButton>
                </div>
                <UploadBox
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  {!file && (
                    <IconWrapper>
                      <FaCloudUploadAlt className="w-20 h-20" />
                    </IconWrapper>
                  )}
                  {file ? (
                    <>
                      <p className="text-center text-gray-600">
                        File selected: {file.name}
                      </p>
                      <CancelButton onClick={clearFile}>Cancel</CancelButton>
                    </>
                  ) : (
                    <p className="text-center text-gray-600">
                      Drag and drop a file here or click to select a file
                    </p>
                  )}
                  <Input
                    id="fileInput"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </UploadBox>

                {fileData.length > 0 && (
                  <>
                    <div className="p-4 mb-4 bg-blue-50 rounded-lg">
                      <h3 className="mb-2 text-lg font-semibold text-blue-800">File Preview</h3>
                      <p className="text-sm text-blue-600">
                        Found {fileData.length} rows (including header). 
                        Showing first 5 rows below:
                      </p>
                    </div>
                    
                    <PreviewTableContainer>
                      <PreviewTable>
                        <thead>
                          <tr>
                            {fileData[0].map((header, index) => (
                              <TableHeader key={index}>{header}</TableHeader>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {fileData.slice(1, 6).map((row, rowIndex) => (
                            <tr
                              key={rowIndex}
                              className="border-b hover:bg-slate-100"
                            >
                              {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex}>
                                  {cell}
                                </TableCell>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </PreviewTable>
                    </PreviewTableContainer>
                    
                    
                    <BtnWrapper>
                      <SubmitBtn onClick={handleSubmit}>Confirm File</SubmitBtn>
                    </BtnWrapper>
                  </>
                )}
                <div className="flex items-center mt-4 text-sm">
                  <FaLock className="mr-2 w-3 h-3" />
                  <HeaderSubTitle>
                    We don't sell, rent or use your database for any commercial
                    purposes.
                    <a
                      href="/privacy-policy"
                      className="ml-1 underline hover:text-topBar-purple"
                    >
                      Read our Privacy Policy.
                    </a>
                  </HeaderSubTitle>
                </div>
              </>
            )}
            {/* <Seperator /> */}
          </Content>
        </Page>
      </Container>
    </>
  );
};

const Wrapper = tw.div`min-h-screen flex flex-col items-left py-10`;
const Seperator = tw.div`w-full h-0.5 bg-gray-200 my-6`;
const BtnWrapper = tw.div`flex justify-center items-center my-2`;
const UploadBox = tw.div`border-2 border-dashed border-gray-300 hover:border-gray-600 rounded-lg p-10 flex flex-col items-center justify-center bg-white w-full cursor-pointer transition duration-200 ease-in-out hover:shadow-lg text-gray-400 hover:text-gray-700 relative`;
const IconWrapper = tw.div`mb-2`;
const Input = tw.input`mt-4 border border-gray-300 rounded px-4 py-2 text-center`;
const PreviewTableContainer = tw.div`my-6 overflow-auto max-h-64`;
const PreviewTable = tw.table`w-full bg-white rounded-lg shadow-lg`;
const TableHeader = tw.th`text-sm p-3 font-medium text-gray-200 text-left bg-[#06163A]`;
const TableCell = tw.td`p-3 text-sm `;
const CancelButton = tw.button`absolute top-2 right-2 text-gray-600 hover:text-red-600`;
const SampleDownloadButton = tw.a`flex underline text-gray-600 hover:text-blue-600`;
const UploadTitle = tw.h1`text-2xl font-medium mb-2`;
const UploadSubTitle = tw.h1`text-md mb-2`;
export default ImportContactUploadPage;
