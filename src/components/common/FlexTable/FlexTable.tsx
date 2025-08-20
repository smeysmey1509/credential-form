import React, { useState, useEffect, useRef } from "react";
import "./FlexTable.css";
import CustomCheckbox from "../checkboxField/checkbox/checkbox";

export interface UserData {
    id?: number;
    uuid?: string;
    username?: string;
    password?: string;
    description?: string;
    email?: string;
    role?: string;
    phoneNumber?: string | null;
    profile?: string | null;
    isActive?: "active" | "deactivated" | "onhold" | "block" | "blocked";
    mfa?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface UserTableColumns {
    key: keyof UserData;
    label: string;
    show: boolean;
    width?: string;
    textColor?: string;
}

const statusColorMap: Record<string, string> = {
    active: "#037847",
    deactivated: "#DC2626",
    onhold: "#D97706",
    block: "#DC2626",
    blocked: "#DC2626",
};

interface UserTableProps {
    columns?: UserTableColumns[];
    data?: UserData[];
    showAvatar?: boolean;
    showCheckbox?: boolean;
    showAction?: boolean;
    showPagination?: boolean;
    onUsernameClick?: (uuid: string) => void;
    actionCell?: {
        view?: (uuid: string | undefined) => void;
        edit?: (uuid: string | undefined) => void;
        delete?: (uuid: string | undefined) => void;
    }
    onSelectionChange?: (selectedUuids: string[]) => void;
}

const FlexTable: React.FC<UserTableProps> = ({
    columns = [],
    data = [],
    showAvatar = false,
    showCheckbox,
    showAction,
    showPagination,
    onUsernameClick,
    actionCell,
    onSelectionChange
}) => {
    const [actionCellId, setActionCellId] = useState<string | number | null>(
        null
    );
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [checked, setChecked] = useState<boolean>(false);
    const [checkedRows, setCheckedRows] = useState<Set<string | undefined>>(new Set());

    const actionRef = useRef<HTMLInputElement>(null);

    // Outside click handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                actionRef.current &&
                !actionRef.current?.contains(event.target as Node)
            ) {
                setActionCellId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!actionRef.current) return;

        const rect = actionRef.current.getBoundingClientRect();
        const popup = actionRef.current;

        const isOverflowRight = rect.right > window.innerWidth;
        const isOverflowBottom = rect.bottom > window.innerHeight;

        popup.classList.toggle("align-left", isOverflowRight);
        popup.classList.toggle("align-up", isOverflowBottom);
    }, [actionCellId]);

    useEffect(() => {
        if (onSelectionChange) {
            const selectedUuids = Array.from(checkedRows).filter((uuid): uuid is string => !!uuid);
            onSelectionChange(selectedUuids);
        }
    }, [checkedRows, onSelectionChange]);

    const handleShowActionCell = (id: string | number) => {
        setActionCellId((prev) => (prev === id ? null : id));
    };

    const handleCheckAll = (isChecked: boolean) => {
        setChecked(isChecked);

        if (isChecked) {
            const pageIds = paginatedData.map((row) => row.uuid);
            setCheckedRows(new Set(pageIds));
        } else {
            setCheckedRows(new Set());
        }
    };

    const handleRowChecked = (uuId: string | undefined, checked: boolean) => {
        setCheckedRows((prev) => {
            const newChecked = new Set(prev);
            if (checked) {
                newChecked.add(uuId);
            } else {
                newChecked.delete(uuId);
            }
            return newChecked;
        });
    };

    // Pagination
    const totalPages = Math.ceil(data.length / rowsPerPage);
    const paginatedData = data.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const start = (currentPage - 1) * rowsPerPage + 1;
    const end = Math.min(start + rowsPerPage - 1, data.length);

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handleSelectUser = (uuid: string) => {
        onUsernameClick?.(uuid);
    };

    const options = [5, 10, 25, 50, 100]

    return (
        <>
            <div className="scl--table-container">
                <table className="scl--flex-table">
                    <thead>
                        <tr>
                            {showCheckbox && (
                                <th style={{
                                    width: '1px'
                                }}>
                                    <CustomCheckbox checked={checked} onChange={handleCheckAll} />
                                </th>
                            )}
                            {columns
                                .filter((col) => col.show)
                                .map((col) => (
                                    <th key={col.key} style={{ width: col.width }}>
                                        {col.label}
                                    </th>
                                ))}
                            {showAction && <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((row, index) => {

                            const key = row.uuid ?? row.id?.toString() ?? index.toString();

                            return (
                                <tr key={row.uuid || index}>
                                    {showCheckbox && (
                                        <td>
                                            <CustomCheckbox
                                                checked={checkedRows.has(row.uuid)}
                                                onChange={(checked) => handleRowChecked(row.uuid, checked)}
                                            />
                                        </td>
                                    )}
                                    {columns
                                        .filter((col) => col.show)
                                        .map((col) => {

                                            const value = row[col.key];

                                            if (col.key === "username" && showAvatar) {
                                                return (
                                                    <td
                                                        key={col.key}
                                                    >
                                                        <div className="scl--avatar-container"
                                                            style={{ color: col.textColor, cursor: "pointer" }}
                                                            onClick={() => handleSelectUser(key)}>
                                                            <img
                                                                src={row.profile || "https://i.pravatar.cc/100"}
                                                                alt={row.username}
                                                                className="scl--avatar"
                                                            />
                                                            <span>{value}</span>
                                                        </div>
                                                    </td>
                                                );
                                            }

                                            if (col.key === "username") {
                                                return (
                                                    <td
                                                        key={col.key}
                                                    >
                                                        <div className="scl--avatar-container">
                                                            <span
                                                                style={{ color: col.textColor, cursor: "pointer" }}
                                                                onClick={() => handleSelectUser(key)}>{value}</span>
                                                        </div>
                                                    </td>
                                                );
                                            }

                                            if (col.key === "isActive") {
                                                return (
                                                    <td key={col.key}>
                                                        <span
                                                            className="scl--status-badge"
                                                            style={{
                                                                width: "fit-content",
                                                                backgroundColor:
                                                                    statusColorMap[String(value)] || "#6B7280",
                                                            }}
                                                        >
                                                            <svg
                                                                width="6"
                                                                height="6"
                                                                viewBox="0 0 6 6"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <circle cx="3" cy="3" r="3" fill="#ECFDF3" />
                                                            </svg>
                                                            {String(value)}
                                                        </span>
                                                    </td>
                                                );
                                            }

                                            return <td key={col.key}>{String(value) || "-"}</td>;
                                            
                                        })}
                                    {showAction && (
                                        <td className="scl--action-cell">
                                            <span
                                                className="scl--action-cell-span"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleShowActionCell(row.uuid || row.id || index);
                                                }}
                                            >
                                                <svg
                                                    width="3"
                                                    height="12"
                                                    viewBox="0 0 3 12"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1.83398 9.33333C2.0992 9.33333 2.35355 9.43869 2.54109 9.62623C2.72863 9.81376 2.83398 10.0681 2.83398 10.3333C2.83398 10.5985 2.72863 10.8529 2.54109 11.0404C2.35355 11.228 2.0992 11.3333 1.83398 11.3333C1.56877 11.3333 1.31441 11.228 1.12688 11.0404C0.939341 10.8529 0.833984 10.5985 0.833984 10.3333C0.833984 10.0681 0.939341 9.81376 1.12688 9.62623C1.31441 9.43869 1.56877 9.33333 1.83398 9.33333ZM1.83398 4.66667C2.0992 4.66667 2.35355 4.77202 2.54109 4.95956C2.72863 5.1471 2.83398 5.40145 2.83398 5.66667C2.83398 5.93188 2.72863 6.18624 2.54109 6.37377C2.35355 6.56131 2.0992 6.66667 1.83398 6.66667C1.56877 6.66667 1.31441 6.56131 1.12688 6.37377C0.939341 6.18624 0.833984 5.93188 0.833984 5.66667C0.833984 5.40145 0.939341 5.1471 1.12688 4.95956C1.31441 4.77202 1.56877 4.66667 1.83398 4.66667ZM1.83398 0C2.0992 0 2.35355 0.105357 2.54109 0.292893C2.72863 0.48043 2.83398 0.734783 2.83398 1C2.83398 1.26522 2.72863 1.51957 2.54109 1.70711C2.35355 1.89464 2.0992 2 1.83398 2C1.56877 2 1.31441 1.89464 1.12688 1.70711C0.939341 1.51957 0.833984 1.26522 0.833984 1C0.833984 0.734783 0.939341 0.48043 1.12688 0.292893C1.31441 0.105357 1.56877 0 1.83398 0Z"
                                                        fill="#667085"
                                                    />
                                                </svg>
                                            </span>
                                            {actionCellId === (row.uuid || row.id || index) && (
                                                <div
                                                    className={`scl--popup-menu ${actionCellId === (row.uuid || row.id || index) ? "show" : ""}`}
                                                    ref={actionRef}
                                                >
                                                    <ul>
                                                        <li onClick={() => actionCell?.view?.(row.uuid)}>
                                                            <svg
                                                                width="12"
                                                                height="10"
                                                                viewBox="0 0 12 10"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M1.22699 5.92386C0.923033 5.36323 0.923033 4.68365 1.22699 4.12302C2.14737 2.42546 3.93958 1.27344 5.99973 1.27344C8.05987 1.27344 9.85208 2.42546 10.7725 4.12302C11.0764 4.68365 11.0764 5.36323 10.7725 5.92386C9.85208 7.62142 8.05987 8.77344 5.99972 8.77344C3.93958 8.77344 2.14737 7.62142 1.22699 5.92386Z"
                                                                    stroke="#171717"
                                                                    stroke-opacity="0.6"
                                                                />
                                                                <path
                                                                    d="M7.50607 5.00098C7.50607 5.8294 6.8345 6.50098 6.00607 6.50098C5.17765 6.50098 4.50607 5.8294 4.50607 5.00098C4.50607 4.17255 5.17765 3.50098 6.00607 3.50098C6.8345 3.50098 7.50607 4.17255 7.50607 5.00098Z"
                                                                    stroke="#171717"
                                                                    stroke-opacity="0.6"
                                                                />
                                                            </svg>
                                                            <span className="scl--popup-text-color">View</span>
                                                        </li>
                                                        <li onClick={() => actionCell?.edit?.(row.uuid)}>
                                                            <svg
                                                                width="10"
                                                                height="10"
                                                                viewBox="0 0 10 10"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M4.72048 3.89402L4.36451 3.5429L4.36451 3.5429L4.72048 3.89402ZM7.33464 1.24378L6.97867 0.892658L6.97867 0.892659L7.33464 1.24378ZM8.78925 1.25532L8.42756 1.60054L8.42756 1.60054L8.78925 1.25532ZM8.828 1.29592L9.1897 0.9507L9.1897 0.950698L8.828 1.29592ZM8.80404 2.68154L8.45421 2.32431H8.45421L8.80404 2.68154ZM6.15118 5.27947L6.50101 5.6367H6.50101L6.15118 5.27947ZM5.67339 5.54098L5.5597 5.05408L5.67339 5.54098ZM4.44356 5.597L4.10166 5.96185H4.10166L4.44356 5.597ZM4.45828 4.37981L4.94734 4.48381V4.48381L4.45828 4.37981ZM4.43433 5.58813L4.08321 5.9441H4.08321L4.43433 5.58813ZM9.30075 1.99672L8.80083 1.98807V1.98807L9.30075 1.99672ZM8.06644 0.721548L8.07041 0.221564H8.07041L8.06644 0.721548ZM4.53711 4.10745L4.09797 3.86836L4.09711 3.86995L4.53711 4.10745ZM4.5354 4.1106L4.09541 3.87311L4.09455 3.87471L4.5354 4.1106ZM5.94104 5.4592L6.18149 5.89759L6.18178 5.89743L5.94104 5.4592ZM5.94015 5.45969L6.18001 5.8984L6.1806 5.89808L5.94015 5.45969ZM5.79412 1C6.07026 1 6.29412 0.776142 6.29412 0.5C6.29412 0.223858 6.07026 0 5.79412 0V1ZM10 4.73529C10 4.45915 9.77614 4.23529 9.5 4.23529C9.22386 4.23529 9 4.45915 9 4.73529H10ZM1.08579 8.91421L1.43934 8.56066L1.43934 8.56066L1.08579 8.91421ZM8.91421 8.91421L8.56066 8.56066L8.56066 8.56066L8.91421 8.91421ZM4.72048 3.89402L5.07645 4.24514L7.69061 1.5949L7.33464 1.24378L6.97867 0.892659L4.36451 3.5429L4.72048 3.89402ZM8.78925 1.25532L8.42756 1.60054L8.4663 1.64113L8.828 1.29592L9.1897 0.950698L9.15095 0.910102L8.78925 1.25532ZM8.80404 2.68154L8.45421 2.32431L5.80134 4.92223L6.15118 5.27947L6.50101 5.6367L9.15388 3.03877L8.80404 2.68154ZM5.67339 5.54098L5.5597 5.05408C5.19987 5.1381 4.98362 5.18732 4.83127 5.20052C4.68516 5.21318 4.72882 5.17909 4.78545 5.23216L4.44356 5.597L4.10166 5.96185C4.35576 6.19996 4.67022 6.21822 4.91759 6.19678C5.15873 6.17589 5.45867 6.10457 5.78709 6.02788L5.67339 5.54098ZM4.45828 4.37981L3.96921 4.27581C3.90049 4.59897 3.83577 4.89696 3.8209 5.13632C3.80549 5.38448 3.8338 5.69809 4.08321 5.9441L4.43433 5.58813L4.78545 5.23216C4.84226 5.2882 4.81036 5.33709 4.81898 5.19831C4.82814 5.05073 4.87169 4.83955 4.94734 4.48381L4.45828 4.37981ZM4.44356 5.597L4.78545 5.23216L4.78545 5.23216L4.43433 5.58813L4.08321 5.9441C4.08928 5.95009 4.09544 5.95601 4.10166 5.96185L4.44356 5.597ZM8.828 1.29592L8.4663 1.64113C8.63473 1.8176 8.72584 1.91457 8.78057 1.98973C8.82691 2.05335 8.79994 2.03929 8.80083 1.98807L9.30075 1.99672L9.80068 2.00536C9.80505 1.75232 9.70046 1.55419 9.58892 1.40103C9.48578 1.2594 9.33877 1.10689 9.1897 0.9507L8.828 1.29592ZM8.80404 2.68154L9.15388 3.03877C9.30829 2.88756 9.46042 2.74004 9.56834 2.60197C9.68499 2.45273 9.7963 2.25832 9.80068 2.00536L9.30075 1.99672L8.80083 1.98807C8.80171 1.93693 8.82908 1.92393 8.78045 1.98615C8.72309 2.05953 8.62861 2.15352 8.45421 2.32431L8.80404 2.68154ZM7.33464 1.24378L7.69061 1.5949C7.87298 1.41001 7.97465 1.30849 8.05437 1.24705C8.12237 1.19463 8.11152 1.22192 8.06247 1.22153L8.06644 0.721548L8.07041 0.221564C7.80636 0.219469 7.60188 0.333231 7.44387 0.455034C7.29757 0.567806 7.14084 0.728255 6.97867 0.892658L7.33464 1.24378ZM8.78925 1.25532L9.15095 0.910104C8.99162 0.743167 8.8376 0.580203 8.69318 0.46508C8.53715 0.340698 8.33451 0.223659 8.07041 0.221564L8.06644 0.721548L8.06247 1.22153C8.01337 1.22114 8.00286 1.19363 8.06985 1.24703C8.14845 1.30969 8.24834 1.41276 8.42756 1.60054L8.78925 1.25532ZM4.72048 3.89402L4.36451 3.5429C4.28408 3.62444 4.17286 3.73081 4.09797 3.86836L4.53711 4.10745L4.97624 4.34653C4.96906 4.35973 4.96438 4.3628 4.97854 4.34677C4.99655 4.32639 5.02281 4.29952 5.07645 4.24514L4.72048 3.89402ZM4.45828 4.37981L4.94734 4.48381C4.96315 4.40947 4.97103 4.37326 4.97804 4.34741C4.9835 4.3273 4.9834 4.33315 4.97626 4.3465L4.5354 4.1106L4.09455 3.87471C4.02043 4.01324 3.99287 4.16454 3.96921 4.27581L4.45828 4.37981ZM4.53711 4.10745L4.09711 3.86995L4.09541 3.87311L4.5354 4.1106L4.9754 4.3481L4.9771 4.34494L4.53711 4.10745ZM6.15118 5.27947L5.80134 4.92223C5.74785 4.97462 5.72141 5.00028 5.70131 5.01794C5.68556 5.0318 5.68817 5.02764 5.7003 5.02097L5.94104 5.4592L6.18178 5.89743C6.31622 5.82358 6.42035 5.71569 6.50101 5.6367L6.15118 5.27947ZM5.67339 5.54098L5.78709 6.02788C5.89821 6.00193 6.04577 5.9718 6.18001 5.8984L5.94015 5.45969L5.70029 5.02098C5.7125 5.0143 5.7172 5.01445 5.69623 5.02054C5.66993 5.02817 5.63331 5.03689 5.5597 5.05408L5.67339 5.54098ZM5.94104 5.4592L5.7006 5.02081L5.69971 5.0213L5.94015 5.45969L6.1806 5.89808L6.18149 5.89759L5.94104 5.4592ZM8.5 3L8.85352 2.64641L7.35319 1.14639L6.99967 1.49998L6.64616 1.85357L8.14648 3.35359L8.5 3ZM5.5 9.5V9H4.5V9.5V10H5.5V9.5ZM0.5 5.5H1V4.5H0.5H0V5.5H0.5ZM4.5 0.5V1H5.79412V0.5V0H4.5V0.5ZM9.5 4.73529H9V5.5H9.5H10V4.73529H9.5ZM4.5 9.5V9C3.54306 9 2.87565 8.99894 2.37208 8.93124C1.8829 8.86547 1.62385 8.74517 1.43934 8.56066L1.08579 8.91421L0.732233 9.26777C1.13351 9.66904 1.63876 9.84164 2.23883 9.92232C2.82452 10.0011 3.57133 10 4.5 10V9.5ZM0.5 5.5H0C0 6.42867 -0.00106186 7.17548 0.0776819 7.76117C0.158359 8.36124 0.330955 8.86649 0.732233 9.26777L1.08579 8.91421L1.43934 8.56066C1.25483 8.37615 1.13453 8.1171 1.06876 7.62792C1.00106 7.12435 1 6.45694 1 5.5H0.5ZM5.5 9.5V10C6.42867 10 7.17548 10.0011 7.76117 9.92232C8.36124 9.84164 8.86649 9.66904 9.26777 9.26777L8.91421 8.91421L8.56066 8.56066C8.37615 8.74517 8.1171 8.86547 7.62792 8.93124C7.12435 8.99894 6.45694 9 5.5 9V9.5ZM9.5 5.5H9C9 6.45695 8.99894 7.12435 8.93124 7.62792C8.86547 8.1171 8.74517 8.37615 8.56066 8.56066L8.91421 8.91421L9.26777 9.26777C9.66904 8.86649 9.84164 8.36124 9.92232 7.76117C10.0011 7.17548 10 6.42868 10 5.5H9.5ZM0.5 4.5H1C1 3.54306 1.00106 2.87565 1.06876 2.37208C1.13453 1.8829 1.25483 1.62385 1.43934 1.43934L1.08579 1.08579L0.732233 0.732233C0.330955 1.13351 0.15836 1.63876 0.0776819 2.23883C-0.00106186 2.82452 0 3.57133 0 4.5H0.5ZM4.5 0.5V0C3.57133 0 2.82452 -0.00106186 2.23883 0.0776819C1.63876 0.15836 1.13351 0.330955 0.732233 0.732233L1.08579 1.08579L1.43934 1.43934C1.62385 1.25483 1.8829 1.13453 2.37208 1.06876C2.87565 1.00106 3.54306 1 4.5 1V0.5Z"
                                                                    fill="#171717"
                                                                    fill-opacity="0.6"
                                                                />
                                                            </svg>
                                                            <span className="scl--popup-text-color">Edit</span>
                                                        </li>
                                                        <li onClick={() => actionCell?.delete?.(row.uuid)}>
                                                            <svg
                                                                width="10"
                                                                height="10"
                                                                viewBox="0 0 10 10"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M1.4 2.30003V1.80003H0.9V2.30003H1.4ZM8.6 2.30003H9.1V1.80003H8.6V2.30003ZM0.5 1.80003C0.223858 1.80003 0 2.02389 0 2.30003C0 2.57618 0.223858 2.80003 0.5 2.80003V1.80003ZM9.5 2.30003V2.80003C9.77614 2.80003 10 2.57618 10 2.30004C10 2.0239 9.77615 1.80004 9.50001 1.80003L9.5 2.30003ZM4.59999 4.55002C4.59999 4.27388 4.37613 4.05002 4.09999 4.05002C3.82385 4.05002 3.59999 4.27388 3.59999 4.55002H4.59999ZM3.59999 7.25002C3.59999 7.52616 3.82385 7.75002 4.09999 7.75002C4.37613 7.75002 4.59999 7.52616 4.59999 7.25002H3.59999ZM6.40004 4.55002C6.40004 4.27388 6.17618 4.05002 5.90004 4.05002C5.6239 4.05002 5.40004 4.27388 5.40004 4.55002H6.40004ZM5.40004 7.25002C5.40004 7.52616 5.6239 7.75002 5.90004 7.75002C6.17618 7.75002 6.40004 7.52616 6.40004 7.25002H5.40004ZM1.4 2.30003V2.80003H8.6V2.30003V1.80003H1.4V2.30003ZM8.6 2.30003H8.1V6.50003H8.6H9.1V2.30003H8.6ZM5.6 9.50003V9.00003H4.4V9.50003V10H5.6V9.50003ZM1.4 6.50003H1.9V2.30003H1.4H0.9V6.50003H1.4ZM4.4 9.50003V9.00003C3.67876 9.00003 3.18813 8.99897 2.82072 8.94957C2.46769 8.90211 2.30418 8.81843 2.19289 8.70714L1.83934 9.06069L1.48579 9.41425C1.81384 9.7423 2.22355 9.87829 2.68747 9.94066C3.137 10.0011 3.70703 10 4.4 10V9.50003ZM1.4 6.50003H0.9C0.9 7.19301 0.898938 7.76303 0.959376 8.21256C1.02175 8.67648 1.15773 9.08619 1.48579 9.41425L1.83934 9.06069L2.19289 8.70714C2.08161 8.59585 1.99792 8.43234 1.95046 8.07932C1.90106 7.71191 1.9 7.22127 1.9 6.50003H1.4ZM8.6 6.50003H8.1C8.1 7.22127 8.09894 7.71191 8.04954 8.07932C8.00208 8.43234 7.91839 8.59585 7.80711 8.70714L8.16066 9.06069L8.51421 9.41425C8.84227 9.08619 8.97825 8.67648 9.04062 8.21256C9.10106 7.76303 9.1 7.193 9.1 6.50003H8.6ZM5.6 9.50003V10C6.29297 10 6.863 10.0011 7.31253 9.94066C7.77645 9.87829 8.18616 9.7423 8.51421 9.41425L8.16066 9.06069L7.80711 8.70714C7.69582 8.81843 7.53231 8.90211 7.17928 8.94957C6.81187 8.99897 6.32124 9.00003 5.6 9.00003V9.50003ZM0.5 2.30003V2.80003H9.5V2.30003V1.80003H0.5V2.30003ZM2.74998 2.3H3.24998V1.5H2.74998H2.24998V2.3H2.74998ZM3.74998 0.5V1H6.24998V0.5V0H3.74998V0.5ZM7.24998 1.5H6.74998V2.3H7.24998H7.74998V1.5H7.24998ZM6.24998 0.5V1C6.52613 1 6.74998 1.22386 6.74998 1.5H7.24998H7.74998C7.74998 0.671574 7.07841 0 6.24998 0V0.5ZM2.74998 1.5H3.24998C3.24998 1.22386 3.47384 1 3.74998 1V0.5V0C2.92156 0 2.24998 0.671573 2.24998 1.5H2.74998ZM0.5 2.30003L0.500002 2.80003C1.81802 2.80003 2.84651 2.80002 3.87499 2.80002C4.90348 2.80001 5.93197 2.80001 7.24999 2.8L7.24998 2.3L7.24998 1.8C5.93196 1.80001 4.90348 1.80001 3.87499 1.80002C2.8465 1.80002 1.81801 1.80003 0.499998 1.80003L0.5 2.30003ZM7.24998 2.3L7.24998 2.8L9.49999 2.80003L9.5 2.30003L9.50001 1.80003L7.24999 1.8L7.24998 2.3ZM4.09999 4.55002H3.59999V7.25002H4.09999H4.59999V4.55002H4.09999ZM5.90004 4.55002H5.40004V7.25002H5.90004H6.40004V4.55002H5.90004Z"
                                                                    fill="#171717"
                                                                    fill-opacity="0.6"
                                                                />
                                                            </svg>
                                                            <span className="scl--popup-text-color">Delete</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {
                showPagination && (
                    <div className="scl--flex-table-footer">
                        <div className="scl--flex-table-perpage">
                            <label className="scl--flex-table-perpage-label">
                                Rows per page:
                            </label>
                            <div className="scl--flex-table-perpage-select-page">
                                <select
                                    className="scl--flex-table-selectpage"
                                    value={rowsPerPage}
                                    onChange={handleRowsPerPageChange}
                                >
                                    {
                                        options?.map((item) => (
                                            <option value={item}>{item}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <span className="scl--flex-table-number">
                                {start} - {end} of {data.length}
                            </span>
                        </div>
                        <div className="scl--flex-table-numberpage">
                            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                                Prev
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageClick(page)}
                                    className={currentPage === page ? "active" : ""}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default FlexTable;
