<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a sample user
        User::create([
            'name' => 'Nguyễn Hoàng Anh',
            'email' => 'hoanganh@example.com',
            'password' => Hash::make('password'), // Hash the password
            'email_verified_at' => now(),
        ]);

        // You can add more users using User::factory()->count(10)->create(); if needed
    }
}
