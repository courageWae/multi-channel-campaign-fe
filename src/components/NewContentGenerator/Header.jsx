import React, { useState } from 'react';
// import { GoDot } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { MdEmail } from "react-icons/md";




const CharacterCount = ({ value, maxLength }) => (
  <p className="text-xs text-right text-gray-500">
    {value.length} / {maxLength} characters
  </p>
);

function Header() {
  const [templateName, setTemplateName] = useState('');
  const [templateLanguage, setTemplateLanguage] = useState('');
  const [selectedType, setSelectedType] = useState('text');

  const handleTemplateNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[a-z0-9_]*$/;
    if (regex.test(value)) {
      setTemplateName(value);
    }
  };

  const handleTemplateLanguageChange = (e) => {
    setTemplateLanguage(e.target.value);
  };

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold ml-5 mt-5 text-left">New Content Template</h1>
      </div>
      <div className="mt-10 p-6 bg-white rounded-md border border-gray-200 shadow-sm rounded-full ">
        <h1 className="text-xl font-bold mb-4 text-left">General Information</h1>
        <div>
          <div className="mb-4">
            <label htmlFor="templateName" className="block text-xl font-medium text-gray-700">
             <GoDotFill className="inline text-red-500" /> Template Name
            </label>
            <input
              type="text"
              id="templateName"
              value={templateName}
              onChange={handleTemplateNameChange}
              maxLength="450"
              className="mt-1 block w-full px-4 py-3 bg-blue-100 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-500 sm:text-sm"
            />
            <small className="block mt-1 text-gray-600 text-xl">
              Template names can only contain lowercase alphanumeric characters and underscores. No other characters or spaces are allowed.
              <CharacterCount value={templateName} maxLength={450} />
            </small>
          </div>
          <div className="mb-4">
            <label htmlFor="templateLanguage" className="block text-xl font-medium text-gray-700">
            <GoDotFill className="inline text-red-500" />  Template Language
            </label>
            <input
              type="text"
              id="templateLanguage"
              value={templateLanguage}
              onChange={handleTemplateLanguageChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-400 bg-blue-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-600 focus:border-blue-500 sm:text-sm"
            />
            <CharacterCount value={templateLanguage} maxLength={70} />
          </div>
      </div>
      <div className="space-y-4">
            <div>
              <div>
                <label className="block text-xl font-medium text-gray-700">
                <GoDotFill className="inline text-red-500" />
                Select Content Type</label>
                </div>
                <div className="mt-2 flex items-center space-x-4">
                    <div className={`p-4 border rounded-lg cursor-pointer ${selectedType === 'text' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`} onClick={() => setSelectedType('text')}>
                        <input type="radio" name="content-type" value="text" checked={selectedType === 'text'} 
                        onChange={() => setSelectedType('text')} className="hidden" />
                        <div className="flex items-center">
                            <div className="mr-2">
                                <div className="text-lg">
                                <FaEnvelopeOpenText className='text-bg-blue-200'/>
                                </div>
                            </div>
                            <div className="text-sm font-medium text-gray-900">Text</div>
                        </div>
                    </div>
                    <div className={`p-4 border rounded-lg cursor-pointer ${selectedType === 'email' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                     onClick={() => setSelectedType('email')}>
                        <input type="radio" name="content-type" value="media" checked={selectedType === 'email'} 
                        onChange={() => setSelectedType('email')} className="hidden" />
                        <div className="flex items-center">
                            <div className="mr-2">
                                <div className="text-lg">
                                <MdEmail />
                                </div>
                            </div>
                            <div><div className="text-sm font-medium text-gray-900 w-full">Email</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </div>
  );
}

export default Header;
