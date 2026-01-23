<template>
  <section id="section-logs" class="content-section">
    <h3 class="fw-bold mb-4">Administrative Audit Trails</h3>
    <div class="card overflow-hidden">
      <table class="table mb-0 small">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Admin User</th>
            <th>Action Category</th>
            <th>Target ID</th>
            <th>Outcome</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2025-10-24 10:20:01</td>
            <td class="fw-bold">Alex Thompson</td>
            <td><span class="text-primary fw-bold">USER_STATUS_CHG</span></td>
            <td>UID#4012</td>
            <td><span class="text-success">SUCCESS</span></td>
          </tr>
          <tr>
            <td>2025-10-24 11:45:12</td>
            <td class="fw-bold">Alex Thompson</td>
            <td><span class="text-success fw-bold">USER_CREATE</span></td>
            <td>UID#4055</td>
            <td><span class="text-success">SUCCESS</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
