# db-backup-cli
db-backup is a command-line tool (CLI) for database backup and restoration. It supports multiple databases (MySQL, PostgreSQL, MongoDB, MSSQL) and allows backup storage in various locations (local, AWS S3, Google Cloud Storage, and Azure Blob Storage).

**Note**: Project is not yet fully completed and tested. Only PostgreSQL and MSSQL have been tested for all commands and work well.

**Features**
    Database connection testing
    Flexible database backup options:
        (To be implemented):Full, incremental, or differential backups
        (Only PostgreSQL so far):Target specific tables/collections
        (Only locally so far):Multiple storage options
        (To be implemented): Backup scheduling(e.g., daily, monthly, yearly)
    **Restore functionality:**
        (Only PostgreSQL so far):Restore entire database or specific tables/collections
        Compatibility with multiple backup formats

**Supported Databases**
    MySQL
    PostgreSQL
    MongoDB
    MSSQL

**Supported Storage Options**
    Local Storage
    (To be implemented):AWS S3
    (To be implemented):Google Cloud Storage
    (To be implemented):Azure Blob Storage

**Prerequisites**
Ensure the following tools are installed:
    Node.js (version 12+)
    Database client tools:
    mysqldump and mysql (for MySQL)
    pg_dump and pg_restore (for PostgreSQL)
    mongodump and mongorestore (for MongoDB)
    sqlcmd (for MSSQL)

    (Optional): Docker
                I provided the Dockerfile and Dockercompose files so you can modify them to your likely. Unfortunately MSSQL has been problematic. 
                I have not yet added and tested MySQL and MongoDB images.

**Installation**
Clone the repository and install the dependencies:
git clone https://github.com/JonasKhoza/db-backup-cli.git
cd db-backup
npm install

**Add the CLI globally:**
npm i -g

This will make the db-backup command available globally.

**Usage**
The CLI provides three primary commands: connect, backup, and restore, --help.
    1. Test Connection
    Test the connection to a database.
    db-backup connect --db-type <type> --host <host> --port <port> --user <user> --password <password> --database <database>

    Options:
    --db-type <type>: Database type (mysql, postgresql, mongodb, mssql)
    --host <host>: Database host
    --port <port>: Database port
    --user <user>: Database username
    --password <password>: Database password
    --database <database>: Database name

    2. Backup Database
    Create a backup of the specified database.
    db-backup backup --db-type <type> --host <host> --port <port> --user <user> --password <password> --database <database> --storage <type> [options]
    Options:

    --db-type <type>: Type of database (e.g., postgresql, mysql, mongodb, sqlite)
    --host <host>: Database host
    --port <port>: Database port
    --user <user>: Database username
    --password <password>: Database password
    --database <database>: Database name
    --storage <type>: Storage type (e.g., local, s3, gcs, azure)
    --backup-type <type>: (Optional) Backup type (full, incremental, differential)
    --tables <tables>: (Optional) Comma-separated list of tables to backup
    --schedule <frequency>: (Optional) Backup frequency (e.g., daily, weekly)
    Storage-specific Options:

    Local Storage:
    --local-path <path>: Directory path for storing backups
    AWS S3:
    --s3-bucket <bucket>: S3 bucket name
    --s3-access-key <key>: AWS S3 access key
    --s3-secret-key <secret>: AWS S3 secret key
    --s3-region <region>: AWS S3 region
    Google Cloud Storage:
    --gcs-bucket <bucket>: GCS bucket name
    --gcs-key-file <path>: Path to GCS service account key file
    Azure Blob Storage:
    --azure-container <container>: Azure Blob container name
    --azure-account-name <name>: Azure account name
    --azure-account-key <key>: Azure account key

    3. Restore Database
    Restore a database from a backup file.
    db-backup restore --db-type <type> --file <path> --database <name> --host <host> --port <port> --user <username> --password <password> [options]
    Note: PostgreSQL backups are backed up as a folder and requires passing a folder for a restore

    Options:
    --db-type <type>: Database type (mysql, postgresql, mongodb)
    --file <path>: Path to the backup file
    --database <name>: Name of the database to restore into
    --host <host>: Database host
    --port <port>: Database port
    --user <username>: Database username
    --password <password>: Database password
    --tables <names>: (Optional) Specific tables/collections to restore

    4. Check commands and options in a command
        Commands: db-backup --help
        Options: db-backup connect --help


    **Examples**
    Connect to a Database
    Test connection to a PostgreSQL database:
        db-backup connect --db-type postgresql --host localhost --port 5432 --user myuser --password mypassword --database mydatabase

    Backup a PostgreSQL Database to locally
        db-backup backup --db-type postgresql --host localhost --port 5432 --user root --password rootpassword --database mydatabase --storage local C:\Users\User\backups
    Restore an MSSQL Database from a Local Backup File
        db-backup restore --db-type mssql --file /path/to/backup.archive --database mydatabase --host localhost --port 1433 --user admin --password adminpassword

    

Some tricky things found about MSSQL(e.g., permmissions, etc..) and others.
Please refer to this Google Docs file: https://docs.google.com/document/d/1ucVwolvNKwF1n1AQs9vzaw13nxZQGvXihVi1cdQm28c/edit?usp=sharing

**License**
This project is licensed under the MIT License.

**Contributing**
I welcome all kinds of contributions, including bug fixes, feature requests, documentation improvements, and more.





