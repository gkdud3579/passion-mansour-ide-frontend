import React from 'react';
import ServiceLayout from '../../layouts/ServiceLayout';
import styles from './Mypage.module.css';
import { Helmet } from 'react-helmet';

export default function Mypage() {
  return (
    <ServiceLayout>
      <Helmet>
        <title>codeVIBE - 마이페이지</title>
      </Helmet>

      <div className={styles.container}>
        <div>profile</div>

        <div>
          <h4></h4>
        </div>

        <div>
          <h4></h4>
        </div>

        <div>
          <button type="button"></button>
        </div>
      </div>
    </ServiceLayout>
  );
}
