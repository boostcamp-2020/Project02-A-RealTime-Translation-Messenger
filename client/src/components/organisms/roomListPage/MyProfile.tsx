import React from 'react';

import useUser from '../../../hooks/useUser';

import MyProfileMolecule from '../../molecules/roomListPage/MyProfile';

function MyProfile() {
  const { nicknameData, languageData, imageLinkData } = useUser();

  return (
    <div>
      <MyProfileMolecule image={imageLinkData} language={languageData} nickname={nicknameData} />
    </div>
  );
}

export default MyProfile;
