import React, { useEffect } from 'react';
import useUser from '../../../hooks/useUser';
import ProfilePictureSelectionMolecule from '../../molecules/userInfoPage/ProfilePictureSelection';

function ProfilePictureSelection() {
  const { imageLinkData, onGetRandomProfileImage } = useUser();

  useEffect(() => {
    if (!imageLinkData) {
      onGetRandomProfileImage();
    }
  }, []);

  return <ProfilePictureSelectionMolecule image={imageLinkData!} onClickRefresh={onGetRandomProfileImage} />;
}

export default ProfilePictureSelection;
