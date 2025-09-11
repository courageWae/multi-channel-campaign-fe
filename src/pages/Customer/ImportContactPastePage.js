import React, { useState } from "react";
import tw from "tailwind-styled-components";
import Sidebar from "components/SideNavbar";
import TopNavbar from "components/TopNavbar";
import { Link } from "react-router-dom";
import {
  AiOutlineQuestionCircle,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { FiCopy } from "react-icons/fi";
import {
  Container,
  Page,
  Content,
  ContentHeader,
  HeaderTitle,
  HeaderSubTitle,
  LearnMoreLink,
} from "../../components/Styles/PageStyles";
import { SubmitBtn } from "../../components/Styles/InputStyles";
import Images from "Images";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import Config from "Config";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "components/Loading";

const ImportContactPastePage = () => {
  const user = useSelector((state) => state.UserReducer.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState("");
  const [error, setError] = useState("");
  const [showSyntax, setShowSyntax] = useState(false);
  const [separator, setSeparator] = useState("Comma");
  const [includeHeader, setIncludeHeader] = useState(true);
  const [copyStatus, setCopyStatus] = useState(null);

  const handleTextareaChange = (e) => {
    setContacts(e.target.value);
  };

  const uploadFileFunction = async (data) => {
    const body = new FormData();
    body.append("groupId", data.groupId);
    body.append("contacts", JSON.stringify(data.contacts));

    return await axios.post(`${Config.apiUrl}/addContacts`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
        Token: `${user.token}`,
      },
    });
  };

  const uploadFileSuccess = (data) => {
    navigate("/contacts");
    toast.success(data?.data?.msg || "Success");
  };

  const uploadFileError = (data) => {
    toast.error(data?.response?.data?.msg || "An Error Occurred");
  };

  const { isLoading: uploadFileLoading, mutate: uploadFileEntry } = useMutation(
    uploadFileFunction,
    {
      onSuccess: uploadFileSuccess,
      onError: uploadFileError,
    }
  );

  const handleSubmit = () => {
    if (!contacts.trim()) {
      setError("Please paste your contacts before submitting.");
      return;
    }

    const lines = contacts.trim().split("\n");

    if (includeHeader) {
      if (lines.length < 2) {
        setError(
          "Expected format not found. Please include header and data rows."
        );
        return;
      }
    } else {
      if (lines.length < 1) {
        setError("Expected format not found. Please include data rows.");
        return;
      }
    }

    const separatorChar =
      separator === "Comma" ? "," : separator === "Semicolon" ? ";" : "\t";
    const expectedHeader = `FIRSTNAME${separatorChar}LASTNAME${separatorChar}SMS${separatorChar}EMAIL${separatorChar}WHATSAPP${separatorChar}TELEGRAM`;

    if (includeHeader) {
      const actualHeader = lines[0].trim();
      if (actualHeader !== expectedHeader) {
        setError("Header does not match the expected format.");
        console.log("Error: Header does not match");
        return;
      }
    }

    const dataRows = includeHeader ? lines.slice(1) : lines;

    const validData = dataRows.every((line) => {
      const lineParts = line.split(separatorChar);
      return lineParts.length === 6;
    });

    if (!validData) {
      setError("One or more data rows do not match the expected format.");
      console.log("Error: Data rows do not match");
      return;
    }

    const contactsArray = dataRows.map((line) => {
      const lineParts = line.split(separatorChar);
      return {
        firstName: lineParts[0],
        lastName: lineParts[1],
        sms: lineParts[2],
        email: lineParts[3],
        whatsapp: lineParts[4],
        telegram:lineParts[5],
      };
    });

    setError("");
    console.log("Values:", contactsArray);
    uploadFileEntry({
      contacts: contactsArray,
      groupId: id,
    });
  };

  const toggleSyntax = () => {
    setShowSyntax(!showSyntax);
  };

  const handleCopySyntax = async () => {
    const syntaxExample = getSyntaxExample();
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(syntaxExample);
        setCopyStatus("success");
      } else {
        fallbackCopyTextToClipboard(syntaxExample);
        setCopyStatus("success");
      }
    } catch (err) {
      console.error("Could not copy text: ", err);
      setCopyStatus("error");
    } finally {
      setTimeout(() => setCopyStatus(null), 2000);
    }
  };

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      setCopyStatus("success");
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
      setCopyStatus("error");
    }
    document.body.removeChild(textArea);
  };

  const getSyntaxExample = () => {
    const separatorChar =
      separator === "Comma" ? "," : separator === "Semicolon" ? ";" : "\t";
    const header = `FIRSTNAME${separatorChar}LASTNAME${separatorChar}SMS${separatorChar}EMAIL${separatorChar}WHATSAPP${separatorChar}TELEGRAM\n`;
    const data = `Emma${separatorChar}Dubois${separatorChar}33612345678${separatorChar}emma@example.com${separatorChar}33612345678${separatorChar}33612565678\nMickael${separatorChar}Parker${separatorChar}15555551234${separatorChar}mickael@example.com${separatorChar}15555551234${separatorChar}33612565678`;
    return includeHeader ? header + data : data;
  };

  const getPlaceholderExample = () => {
    return getSyntaxExample();
  };

  return (
    <>
      <Container>
        {/* <Sidebar /> */}
        <Page>
          <TopNavbar />
          <Content className="!gap-0">
            <ContentHeader>
              <div className="flex items-center justify-between">
                <HeaderTitle>Import contacts with copy/paste</HeaderTitle>
              </div>
              <HeaderSubTitle>
                Copy your contacts and their information from a file and paste
                them into Sevo or type everything directly in the field. This is
                particularly useful when you have a small number of contacts to
                import.
              </HeaderSubTitle>
              <LearnMoreLink>
                <Link to="" className="flex items-center gap-1">
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
                <UploadTitle>Import your data</UploadTitle>
                <div className="flex justify-between">
                  <UploadSubTitle>
                    Copy and paste your contacts and their information from a
                    file.
                  </UploadSubTitle>
                  <SampleDownloadButton onClick={toggleSyntax}>
                    <AiOutlineQuestionCircle className="mt-1 mr-2" />{" "}
                    {showSyntax
                      ? "Hide the expected syntax"
                      : "Show the expected syntax"}
                  </SampleDownloadButton>
                </div>
                {showSyntax && (
                  <SyntaxBox>
                    <p className="mb-2">Example of expected syntax:</p>
                    <div className="flex items-center justify-between mb-2">
                      <SyntaxOptions>
                        <label className="flex">
                          Separator:
                          <select
                            value={separator}
                            onChange={(e) => setSeparator(e.target.value)}
                            className="ml-2"
                          >
                            <option value="Comma">Comma</option>
                            <option value="Semicolon">Semicolon</option>
                            <option value="Tab">Tab</option>
                          </select>
                        </label>
                        <label className="flex ml-4">
                          <input
                            type="checkbox"
                            checked={includeHeader}
                            onChange={() => setIncludeHeader(!includeHeader)}
                          />
                          Header
                        </label>
                      </SyntaxOptions>
                      <CopyButton onClick={handleCopySyntax}>
                        {copyStatus === "success" ? (
                          <AiOutlineCheck className="mr-2" />
                        ) : copyStatus === "error" ? (
                          <AiOutlineClose className="mr-2" />
                        ) : (
                          <FiCopy className="mr-2" />
                        )}
                        {copyStatus === "success" ? "Copied" : "Copy"}
                      </CopyButton>
                    </div>
                    <SyntaxExample>{getSyntaxExample()}</SyntaxExample>
                    <SyntaxNote>
                      The header is optional and your data have to be separated
                      with a comma, semicolon, or tab. Ensure your data is
                      correctly formatted.
                    </SyntaxNote>
                  </SyntaxBox>
                )}
                <Textarea
                  value={contacts}
                  onChange={handleTextareaChange}
                  placeholder={getPlaceholderExample()}
                />
                {error && <ErrorText>{error}</ErrorText>}
                <div className="flex items-center mt-4 text-sm">
                  <FaLock className="w-3 h-3 mr-2" />
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
                <BtnWrapper>
                  <SubmitBtn onClick={handleSubmit}>Check Record</SubmitBtn>
                </BtnWrapper>
                {/* <Seperator /> */}
              </>
            )}
          </Content>
        </Page>
      </Container>
    </>
  );
};

const Wrapper = tw.div`min-h-screen flex flex-col items-left py-10`;
const Seperator = tw.div`w-full h-0.5 bg-gray-200 my-6`;
const BtnWrapper = tw.div`flex justify-center items-center mt-8 mb-2 `;
const ErrorText = tw.p`text-red-600 text-center mt-2`;
const UploadTitle = tw.h1`text-2xl font-medium mb-2`;
const UploadSubTitle = tw.h1`text-md mb-2`;
const SampleDownloadButton = tw.button`flex underline text-gray-600 hover:text-blue-600 `;
const Textarea = tw.textarea` w-full border border-gray-300 rounded px-4 py-2 text-left focus:outline-none focus:border-blue-500 resize-none h-64`;
const SyntaxBox = tw.div`bg-gray-100 p-4 border border-gray-300 rounded my-2`;
const SyntaxOptions = tw.div`flex mb-4`;
const SyntaxExample = tw.pre`bg-white p-2 border border-gray-300 rounded mb-4 whitespace-pre-wrap`;
const SyntaxNote = tw.p`text-gray-600`;
const CopyButton = tw.button`flex items-center ml-4 bg-blue-500 text-white px-2 py-1 rounded`;

export default ImportContactPastePage;
