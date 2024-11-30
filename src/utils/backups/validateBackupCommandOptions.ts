import { BackupCommandI } from "../../models/database.model";
import logger from "../logger";

const validateBackupCommandOptions = (commandOptions: BackupCommandI) => {
  if (commandOptions.storage === "local" && !commandOptions.localPath) {
    //console.error("Error: --local-path is required for local storage.");
    logger.error("Error: --local-path is required for local storage.");
    process.exit(1);
  } else if (
    commandOptions.storage === "s3" &&
    (!commandOptions.s3Bucket ||
      !commandOptions.s3AccessKey ||
      !commandOptions.s3SecretKey ||
      !commandOptions.s3Region)
  ) {
    // console.error(
    //   "Error: S3 storage requires --s3-bucket, --s3-access-key, --s3-secret-key, and --s3-region."
    // );
    logger.error(
      "Error: S3 storage requires --s3-bucket, --s3-access-key, --s3-secret-key, and --s3-region."
    );
    process.exit(1);
  } else if (
    commandOptions.storage === "gcs" &&
    (!commandOptions.gcsBucket || !commandOptions.gcsKeyFile)
  ) {
    // console.error(
    //   "Error: GCS storage requires --gcs-bucket and --gcs-key-file."
    // );
    logger.error(
      "Error: GCS storage requires --gcs-bucket and --gcs-key-file."
    );
    process.exit(1);
  } else if (
    commandOptions.storage === "azure" &&
    (!commandOptions.azureContainer ||
      !commandOptions.azureAccountName ||
      !commandOptions.azureAccountKey)
  ) {
    // console.error(
    //   "Error: Azure storage requires --azure-container, --azure-account-name, and --azure-account-key."
    // );
    logger.error(
      "Error: Azure storage requires --azure-container, --azure-account-name, and --azure-account-key."
    );
    process.exit(1);
  }
  if (commandOptions.storage === "local" && !commandOptions.localPath) {
    //console.error("Error: --local-path is required for local storage.");
    logger.error("Error: --local-path is required for local storage.");
    process.exit(1);
  } else if (
    commandOptions.storage === "s3" &&
    (!commandOptions.s3Bucket ||
      !commandOptions.s3AccessKey ||
      !commandOptions.s3SecretKey ||
      !commandOptions.s3Region)
  ) {
    // console.error(
    //   "Error: S3 storage requires --s3-bucket, --s3-access-key, --s3-secret-key, and --s3-region."
    // );
    logger.error(
      "Error: S3 storage requires --s3-bucket, --s3-access-key, --s3-secret-key, and --s3-region."
    );
    process.exit(1);
  } else if (
    commandOptions.storage === "gcs" &&
    (!commandOptions.gcsBucket || !commandOptions.gcsKeyFile)
  ) {
    // console.error(
    //   "Error: GCS storage requires --gcs-bucket and --gcs-key-file."
    // );
    logger.error(
      "Error: GCS storage requires --gcs-bucket and --gcs-key-file."
    );
    process.exit(1);
  } else if (
    commandOptions.storage === "azure" &&
    (!commandOptions.azureContainer ||
      !commandOptions.azureAccountName ||
      !commandOptions.azureAccountKey)
  ) {
    // console.error(
    //   "Error: Azure storage requires --azure-container, --azure-account-name, and --azure-account-key."
    // );
    logger.error(
      "Error: Azure storage requires --azure-container, --azure-account-name, and --azure-account-key."
    );
    process.exit(1);
  }
};

export default validateBackupCommandOptions;
