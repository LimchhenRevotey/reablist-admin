<template>
    <!-- 2. USERS DIRECTORY -->
    <section id="section-users" class="content-section">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="fw-bold mb-0">Users Directory</h4>
            <button class="btn btn-brand btn-sm d-flex align-items-center gap-2"
                onclick="navigateToSection('create-user')">
                <i data-lucide="user-plus" size="18"></i> Create New User
            </button>
        </div>
        <div class="card overflow-hidden">
            <table class="table mb-0">
                <thead>
                    <tr>
                        <th class="ps-4">User Details</th>
                        <th>Role</th>
                        <th>Account Status</th>
                        <th class="text-end pe-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="ps-4 py-3">
                            <div class="fw-bold">Sarah Jenkins</div>
                            <div class="text-muted small">sarah.j@todo.com</div>
                        </td>
                        <td><span class="badge bg-primary">Admin</span></td>
                        <td><span class="badge-status bg-success-subtle text-success">Active</span></td>
                        <td class="text-end pe-4">
                            <button class="btn btn-light btn-sm" onclick="navigateToSection('view-user')"
                                title="View Detail"><i data-lucide="eye" size="14"></i></button>
                            <button class="btn btn-light btn-sm ms-1" onclick="navigateToSection('update-user')"
                                title="Update User"><i data-lucide="edit-3" size="14"></i></button>
                            <button class="btn btn-warning btn-sm ms-1" title="Toggle Status"><i
                                    data-lucide="user-minus" size="14"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td class="ps-4 py-3">
                            <div class="fw-bold">Mark Wilson</div>
                            <div class="text-muted small">mark.w@todo.com</div>
                        </td>
                        <td><span class="badge bg-secondary">User</span></td>
                        <td><span class="badge-status bg-success-subtle text-success">Active</span></td>
                        <td class="text-end pe-4">
                            <button class="btn btn-light btn-sm" onclick="navigateToSection('view-user')"
                                title="View Detail"><i data-lucide="eye" size="14"></i></button>
                            <button class="btn btn-light btn-sm ms-1" onclick="navigateToSection('update-user')"
                                title="Update User"><i data-lucide="edit-3" size="14"></i></button>
                            <button class="btn btn-warning btn-sm ms-1" title="Toggle Status"><i
                                    data-lucide="user-minus" size="14"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>