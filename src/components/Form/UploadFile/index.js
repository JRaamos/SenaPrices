import { useCallback } from 'react'
import PropTypes from 'prop-types';

import {
  UploadFileContent
} from './styled'

import {useDropzone} from 'react-dropzone'
import { exposeStrapiError } from 'utils'
import { UploadImage } from 'services/api'

const UploadFile = ({ onChange, onSelect, onPreview, accept = 'image/*', children, validate, disabled }) => {

  const onDrop = useCallback(acceptedFiles => {
    loadImage(acceptedFiles)
  }, [onChange])

  const loadImage = useCallback(async files => {
    const [file] = files
    if (file) {
      if( validate && typeof validate === 'function' ){ if(! await validate(file)){ return ;} }
      if( onPreview && typeof onPreview === 'function' ){ onPreview(URL.createObjectURL(file)) ;}
      upFile(file)
    }
  }, [onChange])

  const upFile = useCallback(async file => {
    const result = await UploadImage(file)
    if(!exposeStrapiError(result)){
      if( onChange && typeof onChange === 'function' && result?.length ){ onChange(result?.[0]) ;}
      if( onSelect && typeof onSelect === 'function' && result?.length ){ onSelect(result?.[0]) ;}
    }
  }, [onChange, onSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles:1, accept, disabled })

  return (
    <>
      <UploadFileContent {...getRootProps()}>
        <input {...getInputProps()} style={{display:'none'}} />
        { children }
      </UploadFileContent>
    </>
  );
}


UploadFile.propTypes = {
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  onPreview: PropTypes.func,
  validate: PropTypes.func,
  accept: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};


UploadFile.defaultProps = {
  onChange: undefined,
  onSelect: undefined,
  onPreview: undefined,
  validate: undefined,
  accept: 'image/*',
  disabled: false,
  children: undefined
};

export default UploadFile;
