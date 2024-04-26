import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { LANGUAGE_VERSIONS } from '../../Constants';
import styles from './Editor.module.css';
import { MinusIcon, PlusIcon } from '../../../../components/Icons';

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = 'blue.400';

const LanguageSelector = ({ language, onSelect, onFontSizePlus, onFontSizeMinus }) => {
  return (
    <Box className={styles.selectBox}>
      <Menu isLazy>
        <MenuButton py={0} fontSize="sm" as={Button}>
          {language}
        </MenuButton>
        <MenuList bg="#f1f1f1">
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              color={lang === language ? ACTIVE_COLOR : ''}
              bg={lang === language ? '#f1f1f1' : 'transparent'}
              _hover={{
                color: ACTIVE_COLOR,
                bg: 'gray.900',
              }}
              onClick={() => onSelect(lang)}
            >
              {lang}
              &nbsp;
              <Text as="span" color="gray.600" fontSize="sm">
                {version}
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <div className={styles.btnBox}>
        <span className={styles.fsMsg}>글자크기 : </span>
        <button onClick={onFontSizePlus} className={`${styles.icoBox} ${styles.btnNone}`}>
          <PlusIcon size={14} />
        </button>

        <button onClick={onFontSizeMinus} className={`${styles.icoBox} ${styles.btnNone}`}>
          <MinusIcon size={14} />
        </button>
      </div>
    </Box>
  );
};

export default LanguageSelector;