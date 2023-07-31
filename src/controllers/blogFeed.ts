import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/db';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { DateTime } from 'luxon';
import { json } from 'stream/consumers';

export const threats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    var options = {
      method: 'GET',
      url: 'https://euce1-120-mssp.sentinelone.net/web/api/v2.1/threats?limit=200',
      headers: {
        Authorization:
          'ApiToken viE0YM0zXe00H0ip4qkRrH04Z2PwGviI1bT3wYgPhuU0WW6f3jFnReNATbPbazdXSrHsedWaOMiSotjo',
        'Content-Type': 'application/json',
      },
    };
    const result1 = await axios(options);
    const result = result1.data.data;
    // console.log(result.length,"result");return;
    const insert = await new Promise((resolve, reject) => {
      for (let i = 0; i < result.length; i++) {
        const threatId = result[i].id;
        const insert = pool.query(
          `Insert into sentinel_threats(threatId) value(?)`,
          [threatId],
          function (err: any, result: any) {
            if (err) {
              console.log(err);
            }
          },
        );
      }
      return res.json({
        status: 200,
        success: true,
        data: result,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const blogFeed = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await pool
      .promise()
      .query(
        `select created_on from sentinel_history where sentinel_data = 'blog' ORDER BY id DESC LIMIT 1`,
      );
    const startTime = check[0][0].created_on.getTime();
    const endTime = new Date(startTime + 15 * 60000).getTime();
    const options = {
      method: 'GET',
      url: `https://euce1-120-mssp.sentinelone.net/web/api/v2.1/sentinelonerss?limit=200&createdAt__between=${startTime}-${endTime}`,
      headers: {
        Authorization:
          'ApiToken isamoAdqrY1FMVlpWKfFHxfITPykd0UE7c5ylvbMEaINKTitwxsqEjVO4gKiUGK129fE63NQ89qXFWra',
        'Content-Type': 'application/json',
      },
    };
    const result1 = await axios(options);
    const result = result1?.data?.data;
    const currentTime = DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss');
    let insertedCount = 0;

    if (result) {
      for (let i = 0; i < result.length; i++) {
        const blog_title = result[i].title;
        const blog_description = result[i].summary;
        const blog_url = result[i].link;
        const published_date = result[i].published;
        const author_name = result[i].author;
        const blog_image = result[i].links[1].href;

        try {
          const [existingBlogs] = await pool
            .promise()
            .query('SELECT * FROM blogs WHERE blog_title = ?', [blog_title]);

          if (existingBlogs.length > 0) {
            console.log(`Skipping duplicate entry: ${blog_title}`);
            continue;
          }
          await pool.promise().query(
            `INSERT INTO blogs ( blog_title, blog_description, blog_url, published_date, author_name, blog_image )
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
              blog_title,
              blog_description,
              blog_url,
              published_date,
              author_name,
              blog_image,
            ],
          );

          insertedCount++;
        } catch (err) {
          console.log(err);
        }
      }
      await pool
        .promise()
        .query(
          `INSERT INTO sentinel_history (sentinel_data, created_on) VALUES (?, ?)`,
          ['blog', currentTime],
        );

      if (insertedCount > 0) {
        console.log(`${insertedCount} new rows inserted`);
      } else {
        console.log('No new data to insert');
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const agentsAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await pool
      .promise()
      .query(
        `select created_on from sentinel_history where sentinel_data = 'agent' ORDER BY id DESC LIMIT 1`,
      );
    const startTime = check[0][0].created_on.getTime();
    const currentTime = DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss');

    const options = {
      method: 'GET',
      url: `https://euce1-120-mssp.sentinelone.net/web/api/v2.1/agents?limit=200&createdAt__lte=${startTime}`,
      headers: {
        Authorization:
          'ApiToken isamoAdqrY1FMVlpWKfFHxfITPykd0UE7c5ylvbMEaINKTitwxsqEjVO4gKiUGK129fE63NQ89qXFWra',
        'Content-Type': 'application/json',
      },
    };
    const result1 = await axios(options);
    const result = result1?.data?.data;
    let insertedCount = 0;
    if (result) {
      for (let i = 0; i < result.length; i++) {
        const accountId = result[i].accountId;
        const accountName = result[i].accountName;
        const activeThreats = result[i].activeThreats;
        const agentVersion = result[i].agentVersion;
        const allowRemoteShell = result[i].allowRemoteShell;
        const appsVulnerabilityStatus = result[i].appsVulnerabilityStatus;
        const computerName = result[i].computerName;
        const consoleMigrationStatus = result[i].consoleMigrationStatus;
        const coreCount = result[i].coreCount;
        const cpuCount = result[i].cpuCount;
        const cpuId = result[i].cpuId;
        const createdAt = result[i].createdAt;
        const detectionState = result[i].detectionState;
        const domain = result[i].domain;
        const encryptedApplications = result[i].encryptedApplications;
        const externalId = result[i].externalId;
        const externalIp = result[i].externalIp;
        const firewallEnabled = result[i].firewallEnabled;
        const firstFullModeTime = result[i].firstFullModeTime;
        const fullDiskScanLastUpdatedAt = result[i].fullDiskScanLastUpdatedAt;
        const groupId = result[i].groupId;
        const groupIp = result[i].groupIp;
        const groupName = result[i].groupName;
        const agentId = result[i].id;
        const inRemoteShellSession = result[i].inRemoteShellSession;
        const infected = result[i].infected;
        const installerType = result[i].installerType;
        const isActive = result[i].isActive;
        const isDecommissioned = result[i].isDecommissioned;
        const isPendingUninstall = result[i].isPendingUninstall;
        const isUninstalled = result[i].isUninstalled;
        const isUpToDate = result[i].isUpToDate;
        const lastActiveDate = result[i].lastActiveDate;
        const lastIpToMgmt = result[i].lastIpToMgmt;
        const lastLoggedInUserName = result[i].lastLoggedInUserName;
        const licenseKey = result[i].licenseKey;
        const locationEnabled = result[i].locationEnabled;
        const locationType = result[i].locationType;
        const locations = result[i].locations;
        const machineType = result[i].machineType;
        const mitigationMode = result[i].mitigationMode;
        const mitigationModeSuspicious = result[i].mitigationModeSuspicious;
        const modelName = result[i].modelName;
        const networkQuarantineEnabled = result[i].networkQuarantineEnabled;
        const networkStatus = result[i].networkStatus;
        const operationalState = result[i].operationalState;
        const operationalStateExpiration = result[i].operationalStateExpiration;
        const osArch = result[i].osArch;
        const osName = result[i].osName;
        const osRevision = result[i].osRevision;
        const osStartTime = result[i].osStartTime;
        const osType = result[i].osType;
        const osUsername = result[i].osUsername;
        const rangerStatus = result[i].rangerStatus;
        const rangerVersion = result[i].rangerVersion;
        const registeredAt = result[i].registeredAt;
        const remoteProfilingState = result[i].remoteProfilingState;
        const remoteProfilingStateExpiration =
          result[i].remoteProfilingStateExpiration;
        const scanAbortedAt = result[i].scanAbortedAt;
        const scanFinishedAt = result[i].scanFinishedAt;
        const scanStartedAt = result[i].scanStartedAt;
        const scanStatus = result[i].scanStatus;
        const serialNumber = result[i].serialNumber;
        const siteId = result[i].siteId;
        const siteName = result[i].siteName;
        const storageName = result[i].storageName;
        const storageType = result[i].storageType;
        const threatRebootRequired = result[i].threatRebootRequired;
        const tags = result[i].tags;
        const totalMemory = result[i].totalMemory;
        const updatedAt = result[i].updatedAt;
        const uuid = result[i].uuid;
        const activeDircomputerDistinguishedName =
          result[i].activeDirectory.computerDistinguishedName;
        const lastUserDistinguishedName =
          result[i].activeDirectory.lastUserDistinguishedName;
        try {
          const [existingBlogs] = await pool
            .promise()
            .query('SELECT * FROM sentinel_agents WHERE agentId = ?', [
              agentId,
            ]);

          if (existingBlogs.length > 0) {
            console.log(`Skipping duplicate entry: ${agentId}`);
            continue;
          }
          await pool
            .promise()
            .query(
              `INSERT INTO sentinel_agents ( accountId,accountName,agentVersion,activeThreats,allowRemoteShell,appsVulnerabilityStatus,computerName,consoleMigrationStatus,coreCount,cpuCount,cpuId,createdAt,detectionState,domain,encryptedApplications,externalId,externalIp,firewallEnabled,firstFullModeTime,fullDiskScanLastUpdatedAt,groupId,groupIp,groupName,agentId,inRemoteShellSession,infected,installerType,isActive,isDecommissioned,isPendingUninstall,isUninstalled,isUpToDate,lastActiveDate,lastIpToMgmt,lastLoggedInUserName,licenseKey,locationEnabled,locationType,locations,machineType,mitigationMode,mitigationModeSuspicious,modelName,networkQuarantineEnabled,networkStatus,operationalState,operationalStateExpiration,osArch,osName,osRevision,osStartTime,osType,osUsername,rangerStatus,rangerVersion,registeredAt,remoteProfilingState,scanAbortedAt,scanFinishedAt,scanStartedAt,scanStatus,serialNumber,siteId,siteName,storageName,storageType,threatRebootRequired,totalMemory,updatedAt,uuid)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
              [
                accountId,
                accountName,
                agentVersion,
                activeThreats,
                allowRemoteShell,
                appsVulnerabilityStatus,
                computerName,
                consoleMigrationStatus,
                coreCount,
                cpuCount,
                cpuId,
                createdAt,
                detectionState,
                domain,
                encryptedApplications,
                externalId,
                externalIp,
                firewallEnabled,
                firstFullModeTime,
                fullDiskScanLastUpdatedAt,
                groupId,
                groupIp,
                groupName,
                agentId,
                inRemoteShellSession,
                infected,
                installerType,
                isActive,
                isDecommissioned,
                isPendingUninstall,
                isUninstalled,
                isUpToDate,
                lastActiveDate,
                lastIpToMgmt,
                lastLoggedInUserName,
                licenseKey,
                locationEnabled,
                locationType,
                locations,
                machineType,
                mitigationMode,
                mitigationModeSuspicious,
                modelName,
                networkQuarantineEnabled,
                networkStatus,
                operationalState,
                operationalStateExpiration,
                osArch,
                osName,
                osRevision,
                osStartTime,
                osType,
                osUsername,
                rangerStatus,
                rangerVersion,
                registeredAt,
                remoteProfilingState,
                scanAbortedAt,
                scanFinishedAt,
                scanStartedAt,
                scanStatus,
                serialNumber,
                siteId,
                siteName,
                storageName,
                storageType,
                threatRebootRequired,
                totalMemory,
                updatedAt,
                uuid,
              ],
            );

          insertedCount++;
        } catch (err) {
          console.log(err);
        }
      }
      await pool
        .promise()
        .query(
          `INSERT INTO sentinel_history (sentinel_data, created_on) VALUES (?, ?)`,
          ['Agent', currentTime],
        );

      if (insertedCount > 0) {
        console.log(`${insertedCount} new rows inserted`);
      } else {
        console.log('No new data to insert');
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const threatAgentDetectionInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await pool
      .promise()
      .query(
        `select created_on from sentinel_history where sentinel_data = 'threatAgentDetectionInfo' ORDER BY id DESC LIMIT 1`,
      );
    const startTime = check[0][0].created_on.getTime();

    const currentTime = DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss');

    const options = {
      method: 'GET',
      url: `https://euce1-120-mssp.sentinelone.net/web/api/v2.1/threats?limit=200&createdAt__gt=${startTime}`,
      headers: {
        Authorization:
          'ApiToken isamoAdqrY1FMVlpWKfFHxfITPykd0UE7c5ylvbMEaINKTitwxsqEjVO4gKiUGK129fE63NQ89qXFWra',
        'Content-Type': 'application/json',
      },
    };
    const result1 = await axios(options);
    const result = result1?.data?.data;
    // const currentTime = DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss');
    let insertedCount = 0;
    if (result) {
      for (let i = 0; i < result.length; i++) {
        const threatId = result[i].id;
        const accountId = result[i].agentDetectionInfo.accountId;
        const accountName = result[i].agentDetectionInfo.accountName;
        const agentDetectionState =
          result[i].agentDetectionInfo.agentDetectionState;
        const agentDomain = result[i].agentDetectionInfo.agentDomain;
        const agentIpV4 = result[i].agentDetectionInfo.agentIpV4;
        const agentIpV6 = result[i].agentDetectionInfo.agentIpV6;
        const agentLastLoggedInUpn =
          result[i].agentDetectionInfo.agentLastLoggedInUpn;
        const agentLastLoggedInUserMail =
          result[i].agentDetectionInfo.agentLastLoggedInUserMail;
        const agentLastLoggedInUserName =
          result[i].agentDetectionInfo.agentLastLoggedInUserName;
        const agentMitigationMode =
          result[i].agentDetectionInfo.agentMitigationMode;
        const agentOsName = result[i].agentDetectionInfo.agentOsName;
        const agentOsRevision = result[i].agentDetectionInfo.agentOsRevision;
        const agentRegisteredAt =
          result[i].agentDetectionInfo.agentRegisteredAt;
        const agentUuid = result[i].agentDetectionInfo.agentUuid;
        const agentVersion = result[i].agentDetectionInfo.agentVersion;
        const cloudProviders = result[i].agentDetectionInfo.cloudProviders;
        const cloudProvider = JSON.stringify(cloudProviders);
        const externalIp = result[i].agentDetectionInfo.externalIp;
        const groupId = result[i].agentDetectionInfo.groupId;
        const groupName = result[i].agentDetectionInfo.groupName;
        const siteId = result[i].agentDetectionInfo.siteId;
        const siteName = result[i].agentDetectionInfo.siteName;
        try {
          const [existingBlogs] = await pool
            .promise()
            .query(
              'SELECT * FROM sentinel_threat_agentdetectioninfo WHERE threatId = ?',
              [threatId],
            );

          if (existingBlogs.length > 0) {
            console.log(`Skipping duplicate entry: ${threatId}`);
            continue;
          }
          await pool
            .promise()
            .query(
              `Insert into sentinel_threat_agentdetectioninfo (threatId,accountId,accountName,agentDetectionState,agentDomain,agentIpV4,agentIpV6,agentLastLoggedInUpn,agentLastLoggedInUserMail,agentLastLoggedInUserName,agentMitigationMode,agentOsName,agentOsRevision,agentRegisteredAt,agentUuid,agentVersion,cloudProviders,externalIp,groupId,groupName,siteId,siteName)value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
              [
                threatId,
                accountId,
                accountName,
                agentDetectionState,
                agentDomain,
                agentIpV4,
                agentIpV6,
                agentLastLoggedInUpn,
                agentLastLoggedInUserMail,
                agentLastLoggedInUserName,
                agentMitigationMode,
                agentOsName,
                agentOsRevision,
                agentRegisteredAt,
                agentUuid,
                agentVersion,
                cloudProvider,
                externalIp,
                groupId,
                groupName,
                siteId,
                siteName,
              ],
            );

          insertedCount++;
        } catch (err) {
          console.log(err);
        }
      }
      await pool
        .promise()
        .query(
          `INSERT INTO sentinel_history (sentinel_data, created_on) VALUES (?, ?)`,
          ['threatAgentDetectionInfo', currentTime],
        );

      if (insertedCount > 0) {
        console.log(`${insertedCount} new rows inserted`);
      } else {
        console.log('No new data to insert');
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const threatAgentRealTimeInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await pool
      .promise()
      .query(
        `select created_on from sentinel_history where sentinel_data='threatAgentRealTimeInfo' ORDER BY id DESC LIMIT 1`,
      );
    const startTime = check[0][0].created_on.getTime();

    const currentTime = DateTime.local().toFormat(`yyyy:MM:dd:HH:mm:ss`);
    let insertedCount = 0;
    var options = {
      method: 'GET',
      url: `https://euce1-120-mssp.sentinelone.net/web/api/v2.1/threats?limit=200&createdAt__gt=${startTime}`,
      headers: {
        Authorization:
          'ApiToken isamoAdqrY1FMVlpWKfFHxfITPykd0UE7c5ylvbMEaINKTitwxsqEjVO4gKiUGK129fE63NQ89qXFWra',
        'Content-Type': 'application/json',
      },
    };
    const result1 = await axios(options);
    const result = result1?.data?.data;

    if (result) {
      for (let i = 0; i < result.length; i++) {
        const accountId = result[i].agentRealtimeInfo.accountId;
        const accountName = result[i].agentRealtimeInfo.accountName;
        const activeThreats = result[i].agentRealtimeInfo.activeThreats;
        const agentComputerName = result[i].agentRealtimeInfo.agentComputerName;
        const agentDecommissionedAt =
          result[i].agentRealtimeInfo.agentDecommissionedAt;
        const agentDomain = result[i].agentRealtimeInfo.agentDomain;
        const agentId = result[i].agentRealtimeInfo.agentId;
        const agentInfected = result[i].agentRealtimeInfo.agentInfected;
        const agentIsActive = result[i].agentRealtimeInfo.agentIsActive;
        const agentIsDecommissioned =
          result[i].agentRealtimeInfo.agentIsDecommissioned;
        const agentMachineType = result[i].agentRealtimeInfo.agentMachineType;
        const agentMitigationMode =
          result[i].agentRealtimeInfo.agentMitigationMode;
        const agentNetworkStatus =
          result[i].agentRealtimeInfo.agentNetworkStatus;
        const agentOsName = result[i].agentRealtimeInfo.agentOsName;
        const agentOsRevision = result[i].agentRealtimeInfo.agentOsRevision;
        const agentOsType = result[i].agentRealtimeInfo.agentOsType;
        const agentUuid = result[i].agentRealtimeInfo.agentUuid;
        const agentVersion = result[i].agentRealtimeInfo.agentVersion;
        const groupId = result[i].agentRealtimeInfo.groupId;
        const groupName = result[i].agentRealtimeInfo.groupName;
        // ------------
        const networkInterfaces = result[i].agentRealtimeInfo.networkInterfaces;
        const networkInterfacess = JSON.stringify(networkInterfaces);
        // ----------
        const operationalState = result[i].agentRealtimeInfo.operationalState;
        const rebootRequired = result[i].agentRealtimeInfo.rebootRequired;
        const scanAbortedAt = result[i].agentRealtimeInfo.scanAbortedAt;
        const scanFinishedAt = result[i].agentRealtimeInfo.scanFinishedAt;
        const scanStartedAt = result[i].agentRealtimeInfo.scanStartedAt;
        const scanStatus = result[i].agentRealtimeInfo.scanStatus;
        const siteId = result[i].agentRealtimeInfo.siteId;
        const siteName = result[i].agentRealtimeInfo.siteName;
        const storageName = result[i].agentRealtimeInfo.storageName;
        const storageType = result[i].agentRealtimeInfo.storageType;
        const userActionsNeeded = result[i].agentRealtimeInfo.id; // empty array
        const threat_id = result[i].id;
        try {
          const [existingBlogs] = await pool
            .promise()
            .query(
              'SELECT * FROM sentinel_threat_agentrealtimeinfo WHERE threat_id = ?',
              [threat_id],
            );

          if (existingBlogs.length > 0) {
            console.log(`Skipping duplicate entry: ${threat_id}`);
            continue;
          }
        } catch (error) {
          console.log(error);
        }

        const insert = pool.query(
          `Insert into sentinel_threat_agentrealtimeinfo (accountId,accountName,activeThreats,agentComputerName,agentDecommissionedAt,agentDomain,agentId,agentInfected,agentIsActive,agentIsDecommissioned,agentMachineType,agentMitigationMode,agentNetworkStatus,agentOsName,agentOsRevision,agentOsType,agentUuid,agentVersion,groupId,groupName,operationalState,rebootRequired,scanAbortedAt,scanFinishedAt,scanStartedAt,scanStatus,siteId,siteName,storageName,storageType,threat_id)value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            accountId,
            accountName,
            activeThreats,
            agentComputerName,
            agentDecommissionedAt,
            agentDomain,
            agentId,
            agentInfected,
            agentIsActive,
            agentIsDecommissioned,
            agentMachineType,
            agentMitigationMode,
            agentNetworkStatus,
            agentOsName,
            agentOsRevision,
            agentOsType,
            agentUuid,
            agentVersion,
            groupId,
            groupName,
            operationalState,
            rebootRequired,
            scanAbortedAt,
            scanFinishedAt,
            scanStartedAt,
            scanStatus,
            siteId,
            siteName,
            storageName,
            storageType,
            threat_id,
          ],
        );

        insertedCount++;
      }
      await pool
        .promise()
        .query(
          `INSERT INTO sentinel_history (sentinel_data, created_on) VALUES (?, ?)`,
          ['threatAgentRealTimeInfo', currentTime],
        );

      if (insertedCount > 0) {
        console.log(`${insertedCount} new rows inserted`);
      } else {
        console.log('No new data to insert');
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export const threatKubernetesInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await pool
      .promise()
      .query(
        `select created_on from sentinel_history where sentinel_data = 'threatKubernetesInfo' ORDER BY id DESC LIMIT 1`,
      );
    // console.log(check,"check");
    const startTime = check[0][0].created_on.getTime();

    const options = {
      method: 'GET',
      url: `https://euce1-120-mssp.sentinelone.net/web/api/v2.1/threats?limit=200&createdAt__lte=${startTime}`,
      headers: {
        Authorization:
          'ApiToken isamoAdqrY1FMVlpWKfFHxfITPykd0UE7c5ylvbMEaINKTitwxsqEjVO4gKiUGK129fE63NQ89qXFWra',
        'Content-Type': 'application/json',
      },
    };
    const result1 = await axios(options);
    const result = result1?.data?.data;
    const currentTime = DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss');
    let insertedCount = 0;
    if (result) {
      for (let i = 0; i < result.length; i++) {
        const cluster = result[i].kubernetesInfo.cluster;
        const controllerKind = result[i].kubernetesInfo.controllerKind;
        const controllerLabels = result[i].kubernetesInfo.controllerLabels;
        const controllerName = result[i].kubernetesInfo.controllerName;
        const isContainerQuarantine =
          result[i].kubernetesInfo.isContainerQuarantine;
        const namespace = result[i].kubernetesInfo.namespace;
        const namespaceLabels = result[i].kubernetesInfo.namespaceLabels;
        const node = result[i].kubernetesInfo.node;
        const nodeLabels = result[i].kubernetesInfo.nodeLabels;
        const pod = result[i].kubernetesInfo.pod;
        const podLabels = result[i].kubernetesInfo.podLabels;
        const threat_id = result[i].id;
        try {
          const [existingBlogs] = await pool
            .promise()
            .query(
              'SELECT * FROM sentinel_threat_kubernetesinfo WHERE threat_id  = ?',
              [threat_id],
            );
          if (existingBlogs.length > 0) {
            console.log(`Skipping duplicate entry: ${threat_id}`);
            continue;
          }
          await pool
            .promise()
            .query(
              `Insert into sentinel_threat_kubernetesinfo (cluster,controllerKind,controllerLabels,controllerName,isContainerQuarantine,namespace,namespaceLabels,node,nodeLabels,pod,podLabels,threat_id)value(?,?,?,?,?,?,?,?,?,?,?,?)`,
              [
                cluster,
                controllerKind,
                controllerLabels,
                controllerName,
                isContainerQuarantine,
                namespace,
                namespaceLabels,
                node,
                nodeLabels,
                pod,
                podLabels,
                threat_id,
              ],
            );
          insertedCount++;
        } catch (err) {
          console.log(err);
        }
      }
      await pool
        .promise()
        .query(
          `INSERT INTO sentinel_history (sentinel_data, created_on) VALUES (?, ?)`,
          ['threatKubernetesInfo', currentTime],
        );
      if (insertedCount > 0) {
        console.log(`${insertedCount} new rows inserted`);
      } else {
        console.log('No new data to insert');
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const threatInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await pool
      .promise()
      .query(
        `select created_on from sentinel_history where sentinel_data = 'threatInfo' ORDER BY id DESC LIMIT 1`,
      );
    console.log(check, 'check');

    const startTime = check[0][0].created_on.getTime();

    const options = {
      method: 'GET',
      url: `https://euce1-120-mssp.sentinelone.net/web/api/v2.1/threats?limit=300&createdAt__lte=${startTime}`,
      headers: {
        Authorization:
          'ApiToken isamoAdqrY1FMVlpWKfFHxfITPykd0UE7c5ylvbMEaINKTitwxsqEjVO4gKiUGK129fE63NQ89qXFWra',
        'Content-Type': 'application/json',
      },
    };
    const result1 = await axios(options);
    const result = result1?.data?.data;
    const currentTime = DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss');
    let insertedCount = 0;

    if (result) {
      for (let i = 0; i < result.length; i++) {
        const analystVerdict = result[i].threatInfo.analystVerdict;
        const analystVerdictDescription =
          result[i].threatInfo.analystVerdictDescription;
        const automaticallyResolved =
          result[i].threatInfo.automaticallyResolved;
        // ----------------
        const browserType = result[i].threatInfo.browserType;
        const certificateId = result[i].threatInfo.certificateId;
        const classification = result[i].threatInfo.classification;
        const classificationSource = result[i].threatInfo.classificationSource;
        const cloudFilesHashVerdict =
          result[i].threatInfo.cloudFilesHashVerdict;
        // -----
        // ----------------
        const collectionId = result[i].threatInfo.collectionId;
        const confidenceLevel = result[i].threatInfo.confidenceLevel;
        const createdAt = result[i].threatInfo.createdAt;
        const detectionEngines = result[i].threatInfo.detectionEngines; //array
        const detectionEngines_key =
          result[i].threatInfo.detectionEngines[0].key;
        // -----
        // ----------------
        const detectionEngines_title =
          result[i].threatInfo.detectionEngines[0].title;
        const detectionType = result[i].threatInfo.detectionType;
        const engines = result[i].threatInfo.engines;
        const externalTicketExists = result[i].threatInfo.externalTicketExists;
        const externalTicketId = result[i].threatInfo.externalTicketId;
        // -----
        // ----------------
        const failedActions = result[i].threatInfo.failedActions;
        const fileExtension = result[i].threatInfo.fileExtension;
        const fileExtensionType = result[i].threatInfo.fileExtensionType;
        const filePath = result[i].threatInfo.filePath;
        const fileSize = result[i].threatInfo.fileSize;
        // -----
        // ----------------
        const fileVerificationType = result[i].threatInfo.fileVerificationType;
        const identifiedAt = result[i].threatInfo.identifiedAt;
        const incidentStatus = result[i].threatInfo.incidentStatus;
        const incidentStatusDescription =
          result[i].threatInfo.incidentStatusDescription;
        const initiatedBy = result[i].threatInfo.initiatedBy;
        // -----
        // ----------------
        const initiatedByDescription =
          result[i].threatInfo.initiatedByDescription;
        const initiatingUserId = result[i].threatInfo.initiatingUserId;
        const initiatingUsername = result[i].threatInfo.initiatingUsername;
        const isFileless = result[i].threatInfo.isFileless;
        const isValidCertificate = result[i].threatInfo.isValidCertificate;
        // -----
        // ----------------
        const maliciousProcessArguments =
          result[i].threatInfo.maliciousProcessArguments;
        const md5 = result[i].threatInfo.md5;
        const mitigatedPreemptively =
          result[i].threatInfo.mitigatedPreemptively;
        const mitigationStatus = result[i].threatInfo.mitigationStatus;
        const mitigationStatusDescription =
          result[i].threatInfo.mitigationStatusDescription;
        // -----
        // ----------------
        const originatorProcess = result[i].threatInfo.originatorProcess;
        const pendingActions = result[i].threatInfo.pendingActions;
        const processUser = result[i].threatInfo.processUser;
        const publisherName = result[i].threatInfo.publisherName;
        const reachedEventsLimit = result[i].threatInfo.reachedEventsLimit;
        // -----
        // ----------------
        const rebootRequired = result[i].threatInfo.rebootRequired;
        const sha1 = result[i].threatInfo.sha1;
        const sha256 = result[i].threatInfo.sha256;
        const storyline = result[i].threatInfo.storyline;
        const threatId = result[i].threatInfo.threatId;
        // -----
        // ----------------
        const threatName = result[i].threatInfo.threatName;
        const updatedAt = result[i].threatInfo.updatedAt;
        const threat_id = result[i].id;

        try {
          const [existingBlogs] = await pool
            .promise()
            .query(
              'SELECT * FROM sentinel_threat_threatinfo WHERE  threat_id= ?',
              [threat_id],
            );

          if (existingBlogs.length > 0) {
            console.log(`Skipping duplicate entry: ${threat_id}`);
            continue;
          }
          await pool
            .promise()
            .query(
              `INSERT INTO sentinel_threat_threatinfo (analystVerdict,analystVerdictDescription,automaticallyResolved,browserType,certificateId,classification,classificationSource,cloudFilesHashVerdict,collectionId,confidenceLevel,createdAt,detectionEngines_key,detectionEngines_title,externalTicketExists,externalTicketId,failedActions,fileExtension,fileExtensionType,filePath,fileSize,fileVerificationType,identifiedAt,incidentStatus,incidentStatusDescription,initiatedBy,initiatedByDescription,initiatingUserId,initiatingUsername,isFileless,isValidCertificate,maliciousProcessArguments,md5,mitigatedPreemptively,mitigationStatus,mitigationStatusDescription,originatorProcess,pendingActions,processUser,publisherName,reachedEventsLimit,rebootRequired,sha1,sha256,storyline,threatId,threatName,updatedAt,threat_id)value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
              [
                analystVerdict,
                analystVerdictDescription,
                automaticallyResolved,
                browserType,
                certificateId,
                classification,
                classificationSource,
                cloudFilesHashVerdict,
                collectionId,
                confidenceLevel,
                createdAt,
                detectionEngines_key,
                detectionEngines_title,
                externalTicketExists,
                externalTicketId,
                failedActions,
                fileExtension,
                fileExtensionType,
                filePath,
                fileSize,
                fileVerificationType,
                identifiedAt,
                incidentStatus,
                incidentStatusDescription,
                initiatedBy,
                initiatedByDescription,
                initiatingUserId,
                initiatingUsername,
                isFileless,
                isValidCertificate,
                maliciousProcessArguments,
                md5,
                mitigatedPreemptively,
                mitigationStatus,
                mitigationStatusDescription,
                originatorProcess,
                pendingActions,
                processUser,
                publisherName,
                reachedEventsLimit,
                rebootRequired,
                sha1,
                sha256,
                storyline,
                threatId,
                threatName,
                updatedAt,
                threat_id,
              ],
            );

          insertedCount++;
        } catch (err) {
          console.log(err);
        }
      }
      await pool
        .promise()
        .query(
          `INSERT INTO sentinel_history (sentinel_data, created_on) VALUES (?, ?)`,
          ['threatInfo', currentTime],
        );
      if (insertedCount > 0) {
        console.log(`${insertedCount} new rows inserted`);
      } else {
        console.log('No new data to insert');
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const threatContainerInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await pool
      .promise()
      .query(
        `select created_on from sentinel_history where sentinel_data = 'threatContainerInfo' ORDER BY id DESC LIMIT 1`,
      );
    console.log(check, 'check');

    const startTime = check[0][0].created_on.getTime();

    const options = {
      method: 'GET',
      url: `https://euce1-120-mssp.sentinelone.net/web/api/v2.1/threats?limit=400&createdAt__lte=${startTime}`,
      headers: {
        Authorization:
          'ApiToken isamoAdqrY1FMVlpWKfFHxfITPykd0UE7c5ylvbMEaINKTitwxsqEjVO4gKiUGK129fE63NQ89qXFWra',
        'Content-Type': 'application/json',
      },
    };
    const result1 = await axios(options);
    const result = result1.data.data;

    const currentTime = DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss');
    let insertedCount = 0;

    if (result) {
      for (let i = 0; i < result.length; i++) {
        const containerId = result[i].containerInfo.id;
        const isContainerQuarantine =
          result[i].containerInfo.isContainerQuarantine;
        const labels = result[i].containerInfo.labels;
        const name = result[i].containerInfo.agentDomain;
        const threat_id = result[i].id;
        try {
          const [existingBlogs] = await pool
            .promise()
            .query(
              'SELECT * FROM sentinel_threat_containerinfo WHERE threat_id= ?',
              [threat_id],
            );

          if (existingBlogs.length > 0) {
            console.log(`Skipping duplicate entry: ${threat_id}`);
            continue;
          }
          await pool
            .promise()
            .query(
              `Insert into sentinel_threat_containerinfo (containerId,isContainerQuarantine,labels,name,threat_id)value(?,?,?,?,?)`,
              [containerId, isContainerQuarantine, labels, name, threat_id],
            );

          insertedCount++;
        } catch (err) {
          console.log(err);
        }
      }
      await pool
        .promise()
        .query(
          `INSERT INTO sentinel_history (sentinel_data, created_on) VALUES (?, ?)`,
          ['threatContainerInfo', currentTime],
        );
      if (insertedCount > 0) {
        console.log(`${insertedCount} new rows inserted`);
      } else {
        console.log('No new data to insert');
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export const agentActivedirectory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await pool
      .promise()
      .query(
        `SELECT created_on FROM sentinel_history WHERE sentinel_data = 'agentActivedirectory' ORDER BY id DESC LIMIT 1`,
      );
    console.log(check, 'check');

    const startTime = 1686663081000;
    const options = {
      method: 'GET',

      url: `https://euce1-120-mssp.sentinelone.net/web/api/v2.1/agents?limit=400&createdAt__lte=${startTime}`,

      headers: {
        Authorization:
          'ApiToken isamoAdqrY1FMVlpWKfFHxfITPykd0UE7c5ylvbMEaINKTitwxsqEjVO4gKiUGK129fE63NQ89qXFWra',
        'Content-Type': 'application/json',
      },
    };
    const result1 = await axios(options);

    const result = result1.data.data;
    const currentTime = DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss');
    let insertedCount = 0;

    if (result) {
      for (let i = 0; i < result.length; i++) {
        const computerDistinguishedName =
          result[i].activeDirectory.computerDistinguishedName;
        const computerMemberOf = result[i].computerMemberOf;
        const computerMemberOfF = JSON.stringify(computerMemberOf);
        const lastUserDistinguishedName =
          result[i].activeDirectory.lastUserDistinguishedName;
        const agentId = result[i].id;

        try {
          const [existingEntries] = await pool
            .promise()
            .query(
              'SELECT * FROM sentinel_agent_activedirectory WHERE agentId = ?',
              [agentId],
            );
          if (existingEntries.length > 0) {
            console.log(`Skipping duplicate entry: ${agentId}`);
            continue;
          }

          await pool
            .promise()
            .query(
              `INSERT INTO sentinel_agent_activedirectory (computerDistinguishedName, computerMemberOf, lastUserDistinguishedName, agentId) VALUES (?, ?, ?, ?)`,
              [
                computerDistinguishedName,
                computerMemberOfF,
                lastUserDistinguishedName,
                agentId,
              ],
            );

          insertedCount++;
        } catch (err) {
          console.log(err);
        }
      }

      await pool
        .promise()
        .query(
          `INSERT INTO sentinel_history (sentinel_data, created_on) VALUES (?, ?)`,
          ['agentActivedirectory', currentTime],
        );

      if (insertedCount > 0) {
        console.log(`${insertedCount} new rows inserted`);
      } else {
        console.log('No new data to insert');
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const agentNetworkinterfaces = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await pool
      .promise()
      .query(
        `SELECT created_on FROM sentinel_history WHERE sentinel_data = 'agentNetworkinterfaces' ORDER BY id DESC LIMIT 1`,
      );
    const startTime = check[0][0].created_on.getTime();

    const options = {
      method: 'GET',
      url: `https://euce1-120-mssp.sentinelone.net/web/api/v2.1/agents?limit=400&createdAt__lte=${startTime}`,
      headers: {
        Authorization:
          'ApiToken isamoAdqrY1FMVlpWKfFHxfITPykd0UE7c5ylvbMEaINKTitwxsqEjVO4gKiUGK129fE63NQ89qXFWra',
        'Content-Type': 'application/json',
      },
    };
    const result1 = await axios(options);
    const result = result1.data.data;
    const currentTime = DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss');
    let insertedCount = 0;

    if (result) {
      for (let i = 0; i < result.length; i++) {
        const networkInterfaces = result[i].networkInterfaces;
        for (let j = 0; j < networkInterfaces.length; j++) {
          const gatewayIp = networkInterfaces[j].gatewayIp;
          const gatewayMacAddress = networkInterfaces[j].gatewayMacAddress;
          const networkId = networkInterfaces[j].id;
          const inet = JSON.stringify(networkInterfaces[j].inet);
          const inet6 = JSON.stringify(networkInterfaces[j].inet6);
          const name = networkInterfaces[j].name;
          const physical = networkInterfaces[j].physical;
          const agentId = result[i].id;
          try {
            const [existingEntries] = await pool
              .promise()
              .query(
                'SELECT * FROM sentinel_agent_networkinterfaces WHERE agentId = ?',
                [agentId],
              );
            if (existingEntries.length > 0) {
              // console.log(`Skipping duplicate entry for agentId: ${agentId}`);
              continue;
            }
            await pool
              .promise()
              .query(
                `INSERT INTO sentinel_agent_networkinterfaces (gatewayIp, gatewayMacAddress, networkId, inet, inet6, name, physical, agentId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                  gatewayIp,
                  gatewayMacAddress,
                  networkId,
                  inet,
                  inet6,
                  name,
                  physical,
                  agentId,
                ],
              );
            insertedCount++;
          } catch (err) {
            console.log(err);
          }
        }
      }
      await pool
        .promise()
        .query(
          `INSERT INTO sentinel_history (sentinel_data, created_on) VALUES (?, ?)`,
          ['agentNetworkinterfaces', currentTime],
        );
      if (insertedCount > 0) {
        console.log(`${insertedCount} new rows inserted`);
      } else {
        console.log('No new data to insert');
      }
    } else {
      console.log('No data returned from the API');
    }
  } catch (error) {
    console.log(error);
  }
};

// ------------------------------

export const threatMitigationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await pool
      .promise()
      .query(
        `select created_on from sentinel_history where sentinel_data = 'threatMitigationStatus' ORDER BY id DESC LIMIT 1`,
      );
    const startTime = check[0][0].created_on.getTime();
    const options = {
      method: 'GET',
      url: `https://euce1-120-mssp.sentinelone.net/web/api/v2.1/threats?limit=400&createdAt__lt=${startTime}`,
      headers: {
        Authorization:
          'ApiToken isamoAdqrY1FMVlpWKfFHxfITPykd0UE7c5ylvbMEaINKTitwxsqEjVO4gKiUGK129fE63NQ89qXFWra',
        'Content-Type': 'application/json',
      },
    };
    const result1 = await axios(options);
    const results = result1.data.data;
    const currentTime = DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss');
    let insertedCount = 0;
    if (results) {
      for (let i = 0; i < results.length; i++) {
        const mitigationStatus = results[i].mitigationStatus;
        for (let j = 0; j < mitigationStatus.length; j++) {
          const mitigationItem = mitigationStatus[j];
          const agentSupportsReport = mitigationItem.agentSupportsReport;
          const groupNotFound = mitigationItem.groupNotFound;
          const actionsCounters = mitigationItem.actionsCounters;
          const actionsCounters_failed = actionsCounters
            ? actionsCounters.failed
            : null;
          const actionsCounters_notFound = actionsCounters
            ? actionsCounters.notFound
            : null;
          const actionsCounters_pendingReboot = actionsCounters
            ? actionsCounters.pendingReboot
            : null;
          const actionsCounters_success = actionsCounters
            ? actionsCounters.success
            : null;
          const actionsCounters_total = actionsCounters
            ? actionsCounters.total
            : null;
          const lastUpdate = mitigationItem.lastUpdate;
          const latestReport = mitigationItem.latestReport;
          const mitigationEndedAt = mitigationItem.mitigationEndedAt;
          const mitigationStartedAt = mitigationItem.mitigationStartedAt;
          const status = mitigationItem.status;
          const threat_id = results[i].id;
          try {
            const [existingBlogs] = await pool
              .promise()
              .query(
                'SELECT * FROM sentinel_threat_mitigationstatus WHERE threat_id = ?',
                [threat_id],
              );

            if (existingBlogs.length > 0) {
              // console.log('Skipping duplicate entry for threat_id');
              continue;
            }
            await pool
              .promise()
              .query(
                `INSERT INTO sentinel_threat_mitigationstatus (agentSupportsReport, groupNotFound, actionsCounters_failed, actionsCounters_notFound, actionsCounters_pendingReboot, actionsCounters_success, actionsCounters_total, lastUpdate, latestReport, mitigationEndedAt, mitigationStartedAt, status, threat_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                [
                  agentSupportsReport,
                  groupNotFound,
                  actionsCounters_failed,
                  actionsCounters_notFound,
                  actionsCounters_pendingReboot,
                  actionsCounters_success,
                  actionsCounters_total,
                  lastUpdate,
                  latestReport,
                  mitigationEndedAt,
                  mitigationStartedAt,
                  status,
                  threat_id,
                ],
              );
            insertedCount++;
          } catch (error) {
            console.log(error);
          }
        }
      }

      await pool
        .promise()
        .query(
          `INSERT INTO sentinel_history (sentinel_data, created_on) VALUES (?, ?)`,
          ['threatMitigationStatus', currentTime],
        );
    }
    if (insertedCount > 0) {
      console.log(`${insertedCount} new rows inserted`);
    } else {
      console.log('No new data to insert');
    }
  } catch (error) {
    console.log(error);
  }
};

export const threatIndicators = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await pool
      .promise()
      .query(
        `select created_on from sentinel_history where sentinel_data = 'threatIndicators' ORDER BY id DESC LIMIT 1`,
      );
    // console.log(check, 'check');

    const startTime = check[0][0].created_on.getTime();

    const options = {
      method: 'GET',
      url: `https://euce1-120-mssp.sentinelone.net/web/api/v2.1/threats?limit=400&createdAt__lte=${startTime}`,
      headers: {
        Authorization:
          'ApiToken isamoAdqrY1FMVlpWKfFHxfITPykd0UE7c5ylvbMEaINKTitwxsqEjVO4gKiUGK129fE63NQ89qXFWra',
        'Content-Type': 'application/json',
      },
    };

    const result1 = await axios(options);
    const results = result1.data.data;
    const currentTime = DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss');
    let insertedCount = 0;
    if (results) {
      for (let i = 0; i < results.length; i++) {
        const threat_id = results[i].id;
        const indicators = results[i].indicators;
        for (let j = 0; j < indicators.length; j++) {
          const indicatorItem = indicators[j];
          const category = indicatorItem.category;
          const description = indicatorItem.description;
          const ids = JSON.stringify(indicatorItem.ids);
          const tactics = indicatorItem.tactics;
          for (let k = 0; k < tactics.length; k++) {
            const tactic = tactics[k];
            const tactics_name = tactic.name;
            const tactics_source = tactic.source;
            const techniques = tactic.techniques;
            for (let l = 0; l < techniques.length; l++) {
              const technique = techniques[l];
              const techniques_link = technique.link;
              const techniques_name = technique.name;

              try {
                const [existingBlogs] = await pool
                  .promise()
                  .query(
                    'SELECT * FROM sentinel_threat_indicators WHERE threat_id= ?',
                    [threat_id],
                  );
                if (existingBlogs.length > 0) {
                  // console.log(`Skipping duplicate entry: ${threat_id}`);
                  continue;
                }
                await pool
                  .promise()
                  .query(
                    `INSERT INTO sentinel_threat_indicators (category,description,ids,tactics_name,tactics_source,techniques_link,techniques_name,threat_id) VALUES (?,?,?,?,?,?,?,?)`,
                    [
                      category,
                      description,
                      ids,
                      tactics_name,
                      tactics_source,
                      techniques_link,
                      techniques_name,
                      threat_id,
                    ],
                  ),
                  insertedCount++;
              } catch (error) {
                console.log(error);
              }
            }
          }
        }
      }

      await pool
        .promise()
        .query(
          `INSERT INTO sentinel_history (sentinel_data, created_on) VALUES (?, ?)`,
          ['threatIndicators', currentTime],
        );
    }
    if (insertedCount > 0) {
      console.log(`${insertedCount} new rows inserted`);
    } else {
      console.log('No new data to insert');
    }
  } catch (error) {
    console.log(error);
  }
};

// ---------------------------------------------
export const exclusion = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://euce1-120-mssp.sentinelone.net/web/api/v2.1/exclusions?limit=200',
      headers: {
        Authorization:
          'ApiToken viE0YM0zXe00H0ip4qkRrH04Z2PwGviI1bT3wYgPhuU0WW6f3jFnReNATbPbazdXSrHsedWaOMiSotjo',
        'Content-Type': 'application/json',
      },
    };
    const result1 = await axios(options);
    const results = result1.data.data;
    // console.log(results,"results");
    for (let i = 0; i < results.length; i++) {
      const exclusion = results[i];
      const actions = JSON.stringify(exclusion.actions);
      // const actions = exclusion.actions;
      const applicationName = exclusion.applicationName;
      const createdAt = exclusion.createdAt;
      const description = exclusion.description;
      const imported = exclusion.imported;
      const inAppInventory = exclusion.inAppInventory;
      const includeChildren = exclusion.includeChildren;
      const includeParents = exclusion.includeParents;
      const mode = exclusion.mode;
      const notRecommended = exclusion.notRecommended;
      const osType = exclusion.osType;
      const pathExclusionType = exclusion.pathExclusionType;
      const scope_siteIds = exclusion.scope.siteIds;
      const scopeName = exclusion.scopeName;
      const scopePath = exclusion.scopePath;
      const source = exclusion.source;
      const type = exclusion.type;
      const updatedAt = exclusion.updatedAt;
      const userId = exclusion.userId;
      const userName = exclusion.userName;
      const value = exclusion.value;
      const exclusion_id = results[i].id;

      await pool
        .promise()
        .query(
          `Insert into sentinel_exclusion (actions,applicationName,createdAt,description,imported,inAppInventory,includeChildren,includeParents,mode,notRecommended,osType,pathExclusionType,scope_siteIds,scopeName,scopePath,source,type,updatedAt,userId,userName,value,exclusion_id) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            actions,
            applicationName,
            createdAt,
            description,
            imported,
            inAppInventory,
            includeChildren,
            includeParents,
            mode,
            notRecommended,
            osType,
            pathExclusionType,
            scope_siteIds,
            scopeName,
            scopePath,
            source,
            type,
            updatedAt,
            userId,
            userName,
            value,
            exclusion_id,
          ],
          function (err: any, result: any) {
            if (err) {
              console.log(err);
            }
          },
        );
    }
    return res.json({
      status: 200,
      success: true,
      data: results,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getExclusion = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    pool.query(
      'SELECT * FROM sentinel_exclusion',
      function (err: any, result: any) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            status: 200,
            success: true,
            message: result,
          });
        }
      },
    );
  } catch (error) {
    console.log(error);
  }
};

export const blacklist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://euce1-120-mssp.sentinelone.net/web/api/v2.1/restrictions?limit=300',
      headers: {
        Authorization:
          'ApiToken viE0YM0zXe00H0ip4qkRrH04Z2PwGviI1bT3wYgPhuU0WW6f3jFnReNATbPbazdXSrHsedWaOMiSotjo',
        'Content-Type': 'application/json',
      },
    };
    const result1 = await axios(options);
    const results = result1.data.data;
    // console.log(results,"results");
    for (let i = 0; i < results.length; i++) {
      const blacklist = results[i];

      const createdAt = blacklist.createdAt;
      const description = blacklist.description;
      const imported = blacklist.imported;
      const includeChildren = blacklist.includeChildren;
      const includeParents = blacklist.includeParents;
      const notRecommended = blacklist.notRecommended;
      const osType = blacklist.osType;
      const scope_siteIds = blacklist.scope.siteIds;
      const scopeName = blacklist.scopeName;
      const scopePath = blacklist.scopePath;
      const source = blacklist.source;
      const type = blacklist.type;
      const updatedAt = blacklist.updatedAt;
      const userId = blacklist.userId;
      const value = blacklist.value;
      const blacklist_id = results[i].id;

      await pool
        .promise()
        .query(
          `Insert into sentinel_blacklist (createdAt,description,imported,includeChildren,includeParents,notRecommended,osType,scope_siteIds,scopeName,scopePath,source,type,updatedAt,userId,value,blacklist_id) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            createdAt,
            description,
            imported,
            includeChildren,
            includeParents,
            notRecommended,
            osType,
            scope_siteIds,
            scopeName,
            scopePath,
            source,
            type,
            updatedAt,
            userId,
            value,
            blacklist_id,
          ],
          function (err: any, result: any) {
            if (err) {
              console.log(err);
            }
          },
        );
    }
    return res.json({
      status: 200,
      success: true,
      data: results,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBlacklist = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    pool.query(
      'SELECT * FROM sentinel_blacklist',
      function (err: any, result: any) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            status: 200,
            success: true,
            message: result,
          });
        }
      },
    );
  } catch (error) {
    console.log(error);
  }
};

export const report = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://euce1-120-mssp.sentinelone.net/web/api/v2.1/reports?limit=200',
      headers: {
        Authorization:
          'ApiToken isamoAdqrY1FMVlpWKfFHxfITPykd0UE7c5ylvbMEaINKTitwxsqEjVO4gKiUGK129fE63NQ89qXFWra',
        'Content-Type': 'application/json',
      },
    };
    const result1 = await axios(options);
    const results = result1.data.data;
    // console.log(results,"results");
    for (let i = 0; i < results.length; i++) {
      const report = results[i];
      const attachmentTypes = report.attachmentTypes;
      const attachmentTypes1 = JSON.stringify(attachmentTypes);
      const createdAt = report.createdAt;
      const creatorId = report.creatorId;
      const creatorName = report.creatorName;
      const fromDate = report.fromDate;

      const insightTypes_display_name = report.insightTypes[0].display_name;

      const insightTypes_is_core = report.insightTypes[0].is_core;

      const insightTypes_is_global = report.insightTypes[0].is_global;
      const insightTypes_report_args = report.insightTypes[0].report_args;
      const inside = JSON.stringify(insightTypes_report_args);
      const insightTypes_report_id_name = report.insightTypes[0].report_id_name;
      const interval = report.interval;

      const name = report.name;
      const scope = report.scope;
      const sites = report.sites;
      const status = report.status;
      const toDate = report.toDate;
      const report_id = results[i].id;

      await pool
        .promise()
        .query(
          `Insert into sentinel_report (attachmentTypes,createdAt,creatorId,creatorName,fromDate,insightTypes_display_name,insightTypes_is_core,insightTypes_is_global,insightTypes_report_args,insightTypes_report_id_name,\`interval\`,name,scope,sites,status,toDate,report_id) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          [
            attachmentTypes1,
            createdAt,
            creatorId,
            creatorName,
            fromDate,
            insightTypes_display_name,
            insightTypes_is_core,
            insightTypes_is_global,
            inside,
            insightTypes_report_id_name,
            interval,
            name,
            scope,
            sites,
            status,
            toDate,
            report_id,
          ],
          function (err: any, result: any) {
            if (err) {
              console.log(err);
            }
          },
        );
    }
    return res.json({
      status: 200,
      success: true,
      data: results,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getReport = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = pool.query(
      `select * from sentinel_report`,
      function (err: any, result: any) {
        if (err) {
          console.log(err);
        }
        return res.json({
          status: 200,
          success: true,
          message: result,
        });
      },
    );
  } catch (error) {
    console.log(error);
  }
};

export const test2 = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const check = await pool
      .promise()
      .query(
        `SELECT created_on FROM sentinel_history WHERE sentinel_data = 'threatInfo' ORDER BY id DESC LIMIT 1`,
      );
    console.log(check, 'check');

    const startTime = 1686299523000;
    const options = {
      method: 'GET',
      url: `https://euce1-120-mssp.sentinelone.net/web/api/v2.1/threats?limit=300&createdAt__lte=${startTime}`,
      headers: {
        Authorization:
          'ApiToken isamoAdqrY1FMVlpWKfFHxfITPykd0UE7c5ylvbMEaINKTitwxsqEjVO4gKiUGK129fE63NQ89qXFWra',
        'Content-Type': 'application/json',
      },
    };

    const result1 = await axios(options);
    const result = result1?.data?.data;
    const currentTime = DateTime.local().toFormat('yyyy-MM-dd HH:mm:ss');
    let insertedCount = 0;

    if (result) {
      for (let i = 0; i < result.length; i++) {
        const { classification } = result[i].threatInfo;
        console.log(classification, '<<<<<<<<<<classification');

        try {
          const [existingBlogs] = await pool
            .promise()
            .query('SELECT * FROM threat_threatinfo WHERE threat_id = ?', [
              result[i].id,
            ]);

          if (existingBlogs.length > 0) {
            console.log(`Skipping duplicate entry: ${result[i].id}`);
            continue;
          }

          await pool
            .promise()
            .query(
              `INSERT INTO test (classification, threat_id) VALUES (?, ?)`,
              [classification, result[i].id],
            );

          insertedCount++;
        } catch (err) {
          console.log(err);
        }
      }

      if (insertedCount > 0) {
        console.log(`${insertedCount} new rows inserted`);
      } else {
        console.log('No new data to insert');
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// ----------------------cronTabGetAll------------------------



// --------------cronTab Update--------

