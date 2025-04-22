<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Appointment;
use Carbon\Carbon;

class AppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Find the user created by UserSeeder
        $user = User::where('email', 'hoanganh@example.com')->first();

        if ($user) {
            // Create some upcoming appointments (relative to April 22, 2025)
            Appointment::create([
                'user_id' => $user->id,
                'title' => 'Họp team dự án A',
                'description' => 'Thảo luận tiến độ và các vấn đề còn tồn đọng',
                'appointment_time' => Carbon::create(2025, 4, 24, 14, 0, 0), // April 24, 2025 14:00
            ]);

            Appointment::create([
                'user_id' => $user->id,
                'title' => 'Gặp khách hàng B',
                'description' => 'Trình bày demo sản phẩm',
                'appointment_time' => Carbon::create(2025, 4, 27, 9, 30, 0), // April 27, 2025 09:30
            ]);

            // Create some overdue appointments (relative to April 22, 2025)
            Appointment::create([
                'user_id' => $user->id,
                'title' => 'Kiểm tra sức khỏe định kỳ',
                'description' => 'Tại bệnh viện XYZ',
                'appointment_time' => Carbon::create(2025, 4, 15, 8, 0, 0), // April 15, 2025 08:00
            ]);

             Appointment::create([
                'user_id' => $user->id,
                'title' => 'Nộp báo cáo tháng',
                'appointment_time' => Carbon::create(2025, 4, 21, 17, 0, 0), // April 21, 2025 17:00
            ]);
        } else {
            $this->command->info('User hoanganh@example.com not found. Skipping appointment seeding.');
        }
    }
}
